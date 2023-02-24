import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { JiraFieldName } from "./dicts/jira/fields";
import { serializeAssignee } from "./serializers/serializeAssignee";
import { serializeComponent } from "./serializers/serializeComponent";
import { serializeIssueAttachments } from "./serializers/serializeIssueAttachments";
import { serializeIssueComments } from "./serializers/serializeIssueComments";
import { serializeIssueStatus } from "./serializers/serializeIssueStatus";
import { serializeIssueTester } from "./serializers/serializeIssueTester";
import { serializeIssueType } from "./serializers/serializeIssueType";
import { serializeLabels } from "./serializers/serializeLabels";
import { serializeIssuePriority } from "./serializers/serializeIssuePriority";
import { serializeUser } from "./serializers/serializeUser";
import { JiraExportIssue, JiraExportIssueCustomFieldValue, JiraExportLink } from "./types";
import { jiraComponents } from "./dicts/jira/component";
import { serializeIssueEstimation } from "./serializers/serializeIssueEstimation";
import { serializeReporter } from "./serializers/serializeReporter";
import { serializeIssueDescription } from "./serializers/serializeIssueDescription";
import { IssueLink } from "youtrack-rest-client/dist/entities/issueLink";

const log = createLogger("migrator:converter");

type Options = {
  projectKey: string;
};

const serializeIssueCustomFieldValues = (youtrackIssue: Issue) => {
  const values: JiraExportIssueCustomFieldValue[] = [];
  const issueType = serializeIssueType(youtrackIssue.fields);
  const testerUserId = serializeIssueTester(youtrackIssue.fields);

  if (testerUserId) {
    values.push({
      fieldName: "Tester",
      fieldType: "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
      value: testerUserId,
    });
  }

  log("=>", issueType);
  if (issueType === "Epic") {
    values.push({
      fieldName: "Epic Name",
      fieldType: "com.pyxis.greenhopper.jira:gh-epic-label",
      value: "Test Epic Name",
    });
  }

  return values;
};

/**
 * Преобразовывает задачу YouTrack в задачу Jira.
 *
 * @param youtrackIssue Объект с данными по задаче YouTrack
 * @returns
 */
const convertYouTrackIssueToJiraIssue = (youtrackIssue: Issue, { projectKey }: Options) => {
  const key = `${projectKey}-${youtrackIssue.numberInProject}`;

  log(`Converting issue with ID`, key);

  const data: JiraExportIssue = {
    key: key,
    externalId: key,
    summary: youtrackIssue.summary!,
    description: serializeIssueDescription(youtrackIssue.description),
    created: new Date(youtrackIssue.created!),

    issueType: serializeIssueType(youtrackIssue.fields),
    priority: serializeIssuePriority(youtrackIssue.fields),
    status: serializeIssueStatus(youtrackIssue.fields),

    labels: serializeLabels(youtrackIssue),
    components: serializeComponent(youtrackIssue.fields),

    assignee: serializeAssignee(youtrackIssue.fields),
    reporter: serializeReporter(youtrackIssue),

    /**
     * @todo [ajile]: С комментариями в задачах есть проблемы:
     *                  1. При повторном импортировании комментарии повторно добавляются к задаче
     *                     из-за чего дублируются;
     *                  2. В комментариях могут содержаться файлы — их прикрепить к комментарию
     *                     при экспорте невозможно формат импортирования этого не предусматривает.
     */
    comments: serializeIssueComments(youtrackIssue.comments),

    /**
     * @todo [ajile]: С приложениями в задачах есть проблемы: При повторном импортировании файлы
     *                повторно добавляются к задаче из-за чего дублируются
     */
    attachments: serializeIssueAttachments(youtrackIssue.attachments),

    customFieldValues: serializeIssueCustomFieldValues(youtrackIssue),
    originalEstimate: serializeIssueEstimation(youtrackIssue.fields),
  };

  return data;
};

const normalizeIssueLink = (ytLinks: IssueLink[], numberInProject: number) => {
  const links = ytLinks?.filter((link) => link.issues.length);

  return links
    .filter((link) => link.issues.length)
    .flatMap((link) => {
      return link.issues.map((issue) => ({
        from: numberInProject,
        to: issue.numberInProject,
        linkType:
          link.direction === "OUTWARD" || link.direction === "BOTH"
            ? link.linkType?.sourceToTarget
            : link.linkType?.targetToSource,
        linkName: link.linkType?.name,
      }));
    });
};
const convertYouTrackIssueLinkToJiraIssueLink = (youtrackIssue: Issue) => {
  const links = normalizeIssueLink(youtrackIssue.links || [], youtrackIssue.numberInProject!);

  return links;
};

/**
 * Возвращает статичный список компонентов проекта.
 */
export const getComponents = () => {
  return jiraComponents.map((component) => ({
    description: component.description,
    lead: component.lead,
    name: component.name,
  }));
};

export const getJiraExportJson = async (ytIssues: AsyncGenerator<Issue>) => {
  const issues: JiraExportIssue[] = [];
  const links: unknown[] = [];

  for await (const ytIssue of ytIssues) {
    issues.push(convertYouTrackIssueToJiraIssue(ytIssue, { projectKey: "MT" }));

    const issueLinks = convertYouTrackIssueLinkToJiraIssueLink(ytIssue);
    if (issueLinks) {
      issueLinks.forEach((link) => links.push(link));
    }
  }

  return {
    projects: [
      {
        name: "Merchant Test",
        key: "MT",
        description: "Merchant Test project description",
        components: getComponents(),
        issues,
        // links,
      },
    ],
  };
};

// @todo [ajile]: В задаче YT хранится релизная версия и Fix versions, можно релизы тоже перенести в Jira
// @todo [ajile]: Учитывать On Production при определении статуса задачи для фронтов
// @todo [ajile]: Import “links”
