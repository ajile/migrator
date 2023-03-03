import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { JiraExportIssue } from "../types";
import { serializeIssueComments } from "./serializeIssueComments";

const log = createLogger("migrator:converter:utils:getJiraExportCommentsJson");

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

  const comments = serializeIssueComments(youtrackIssue.comments);

  return comments.length
    ? {
        key: key,
        externalId: key,

        /**
         * @todo [ajile]: С комментариями в задачах есть проблемы:
         *                  1. При повторном импортировании комментарии повторно добавляются к задаче
         *                     из-за чего дублируются;
         *                  2. В комментариях могут содержаться файлы — их прикрепить к комментарию
         *                     при экспорте невозможно формат импортирования этого не предусматривает.
         */
        comments,
      }
    : undefined;
};

export const getJiraExportCommentsJson = async (
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
