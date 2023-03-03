import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { JiraExportIssue } from "../types";
import { serializeIssueAttachments } from "./serializeIssueAttachments";

const log = createLogger("migrator:converter:utils:getJiraExportAttachmentsJson");

type Options = {
  projectKey: string;
};

/**
 * Преобразовывает задачу YouTrack в задачу Jira.
 *
 * @param youtrackIssue Объект с данными по задаче YouTrack
 * @returns
 */
export const convertIssue = (youtrackIssue: Issue, { projectKey }: Options) => {
  const key = `${projectKey}-${youtrackIssue.numberInProject}`;

  log(`Converting issue with ID`, key);

  const ytAttachments = [
    ...(youtrackIssue.attachments || []),
    // Put comments attachments into the issue
    ...(youtrackIssue.comments?.map((comment) => comment.attachments).flat() || []),
  ];

  const attachments = serializeIssueAttachments(ytAttachments);

  return attachments.length
    ? {
        key: key,
        externalId: key,
        attachments,
      }
    : undefined;
};

export const getJiraExportAttachmentsJson = async (
  ytIssues: AsyncGenerator<Issue>,
  { projectKey }: { projectKey: string }
) => {
  const issues: Partial<JiraExportIssue>[] = [];

  log("Get Jira export json");

  for await (const ytIssue of ytIssues) {
    log(`Converting issue`, ytIssue.numberInProject);

    if (ytIssue.project?.id !== "77-15") {
      log(
        // eslint-disable-next-line max-len
        `The issue ${ytIssue.numberInProject} is not belong to Merchant Services, it belongs to ${ytIssue.project?.name}`
      );
      continue;
    }

    const serialized = convertIssue(ytIssue, { projectKey });

    if (serialized) {
      issues.push(serialized);
    }
  }

  return {
    projects: [
      {
        name: "Merchant Test",
        key: projectKey,
        issues,
      },
    ],
  };
};
