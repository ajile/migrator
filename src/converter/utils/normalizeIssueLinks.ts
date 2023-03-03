import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { IssueLink } from "youtrack-rest-client/dist/entities/issueLink";
import { JiraIssueLinkTypeName } from "../dicts/jira/link";
import { jiraIssueLinkTypeByYouTrackIssueLinkType } from "../dicts/mapping/issue-link-type";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { YoutrackIssueType } from "../dicts/youtrack/issue-type";
import {
  YoutrackIssueLinkTypeInward,
  YoutrackIssueLinkTypeName,
  YoutrackIssueLinkTypeOutward,
  youtrackIssueLinkTypes,
} from "../dicts/youtrack/link";
import { JiraExportLink } from "../types";
import { getFieldValue } from "./getFieldValue";

type Options = {
  projectKey: string;
};

const getIssueKey = (numberInProject: number, projectKey: string) => `${projectKey}-${numberInProject}`;

type Direction = "BOTH" | "OUTWARD" | "INWARD";
type Relation = YoutrackIssueLinkTypeInward | YoutrackIssueLinkTypeOutward;
type NormalizeIssueLinkProps = {
  direction: Direction;
  leftIssueKey: string;
  relation: Relation;
  rightIssueKey: string;
  linkName: YoutrackIssueLinkTypeName;
  epicRelation: boolean;
};

export type StraightenedLink = {
  direction: Direction;
  leftIssueKey: string;
  relation: JiraIssueLinkTypeName;
  rightIssueKey: string;
  linkName: YoutrackIssueLinkTypeName;
  epicRelation: boolean;
};

const ytExceptionLinkName = new Set(["Depend"]);

/**
 * Преобразовывает исходящую и входящую связь во входящую связь.
 */
export const straighteningLink = ({
  direction,
  leftIssueKey,
  relation,
  rightIssueKey,
  linkName,
  epicRelation,
}: NormalizeIssueLinkProps): StraightenedLink => {
  const log = createLogger(`migrator:converter:utils:straighteningLink:${leftIssueKey}`);

  log(`BEFORE: ${direction} | ${leftIssueKey} | ${relation} | ${rightIssueKey} | ${linkName} | ${epicRelation}`);

  if (direction === "OUTWARD") {
    direction = "INWARD";
    [leftIssueKey, rightIssueKey] = [rightIssueKey, leftIssueKey];
    relation = youtrackIssueLinkTypes.find((link) => link.inward === relation)!.outward;
  }

  // Направление связей в YT и Jira различаются
  if (ytExceptionLinkName.has(linkName)) {
    [leftIssueKey, rightIssueKey] = [rightIssueKey, leftIssueKey];
    relation = youtrackIssueLinkTypes.find((link) => link.outward === relation)!.inward;
  }

  const mappedRelation = jiraIssueLinkTypeByYouTrackIssueLinkType[relation]!;

  log(`AFTER : ${direction} | ${leftIssueKey} | ${relation} | ${rightIssueKey} | ${linkName} | ${mappedRelation}`);

  return {
    direction,
    leftIssueKey,
    relation: mappedRelation,
    rightIssueKey,
    linkName,
    epicRelation,
  };
};

/**
 * Проходится по каждой исходящей и входящей связи задачи, конвертирует
 * во входящую и возвращает массив связей.
 */
export const normalizeIssueLinks = (issue: Issue, { projectKey }: Options): StraightenedLink[] => {
  const result: StraightenedLink[] = [];
  const numberInProject: number = issue.numberInProject!;
  const pivotIssueKey = getIssueKey(numberInProject, projectKey);
  const log = createLogger(`migrator:converter:utils:normalizeIssueLinks:${pivotIssueKey}`);
  const links: IssueLink[] = (issue.links || []).filter((link) => link.issues.length);

  log(`Normalize links for issue`, pivotIssueKey);

  links.forEach((link) => {
    link.issues.forEach((linkIssue) => {
      if (!link.linkType) throw new Error("No linkType!");
      if (!linkIssue.numberInProject) throw new Error("No numberInProject!");

      // Пропускаем все задачи не относящиеся к мерчантке
      if (linkIssue.project?.id !== "77-15") return;

      const direction = link.direction;
      const leftIssueKey = pivotIssueKey;

      // @ts-ignore
      const leftIssueType = getFieldValue(issue.fields, YouTrackFieldName.TYPE);
      const rightIssueKey = getIssueKey(linkIssue.numberInProject, projectKey);

      // @ts-ignore
      const rightIssueType = getFieldValue(linkIssue.fields, YouTrackFieldName.TYPE);
      const linkName = link.linkType.name;
      const sourceToTarget = link.linkType.sourceToTarget;
      const targetToSource = link.linkType.targetToSource;
      const relation = direction === "BOTH" || direction === "OUTWARD" ? sourceToTarget : targetToSource;

      if (!leftIssueType) {
        throw new Error("No left issue type in link");
      }
      if (!rightIssueType) {
        throw new Error("No right issue type in link");
      }

      result.push(
        straighteningLink({
          direction: direction! as Direction,
          leftIssueKey,
          relation: relation! as Relation,
          rightIssueKey,
          linkName: linkName as YoutrackIssueLinkTypeName,
          epicRelation: leftIssueType === YoutrackIssueType.EPIC || rightIssueType === YoutrackIssueType.EPIC,
        })
      );
    });
  });

  return result;
};
