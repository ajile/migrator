import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { JiraExportIssue } from "../types";
import { deduplicateLinksAndMore } from "./deduplicateLinksAndMore";
import { normalizeIssueLinks, StraightenedLink } from "./normalizeIssueLinks";
import { serializeIssueCustomFieldValues } from "./serializeIssueCustomFieldValues";

const log = createLogger("migrator:converter:utils:getJiraExportLinksJson");

type Options = {
  projectKey: string;
  links: StraightenedLink[];
};

/**
 * Преобразовывает задачу YouTrack в задачу Jira.
 *
 * @param youtrackIssue Объект с данными по задаче YouTrack
 * @returns
 */
export const convertIssue = (youtrackIssue: Issue, { projectKey, links }: Options) => {
  const key = `${projectKey}-${youtrackIssue.numberInProject}`;

  log(`Converting issue with ID`, key);

  const customFieldValues = serializeIssueCustomFieldValues(youtrackIssue, { links, projectKey }).filter(
    ({ fieldName }) => fieldName === "Epic Link"
  );

  return customFieldValues.length
    ? {
        key: key,
        externalId: key,
        customFieldValues,
      }
    : undefined;
};

export const getJiraExportLinksJson = async (
  ytIssues: AsyncGenerator<Issue>,
  { projectKey }: { projectKey: string }
) => {
  const issues: Partial<JiraExportIssue>[] = [];
  const linkBunches: StraightenedLink[][] = [];

  log("Get Jira export links json");

  for await (const ytIssue of ytIssues) {
    log(`Converting issue`, ytIssue.numberInProject);

    if (ytIssue.project?.id !== "77-15") {
      log(
        // eslint-disable-next-line max-len
        `The issue ${ytIssue.numberInProject} is not belong to Merchant Services, it belongs to ${ytIssue.project?.name}`
      );
      continue;
    }

    const links = normalizeIssueLinks(ytIssue, { projectKey });
    linkBunches.push(links);

    const serialized = convertIssue(ytIssue, { projectKey, links });

    if (serialized) {
      issues.push(serialized);
    }
  }

  const links = linkBunches.flat().filter((link) => {
    const remove = link.epicRelation && link.relation === "Consist";
    if (remove) {
      log(`Remove “${link.relation}” link from ${link.leftIssueKey} to ${link.rightIssueKey}`);
    }
    return !remove;
  });

  return {
    projects: [
      {
        name: "Merchant Test",
        key: projectKey,
        issues,
      },
    ],
    links: deduplicateLinksAndMore(links),
  };
};
