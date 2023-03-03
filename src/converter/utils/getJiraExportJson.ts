import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { JiraExportIssue } from "../types";
import { getComponents } from "./getComponents";
import { serializeAssignee } from "./serializeAssignee";
import { serializeComponent } from "./serializeComponent";
import { serializeIssueCustomFieldValues } from "./serializeIssueCustomFieldValues";
import { serializeIssueDescription } from "./serializeIssueDescription";
import { serializeIssueEstimation } from "./serializeIssueEstimation";
import { serializeIssuePriority } from "./serializeIssuePriority";
import { serializeIssueStatus } from "./serializeIssueStatus";
import { serializeIssueType } from "./serializeIssueType";
import { serializeLabels } from "./serializeLabels";
import { serializeReporter } from "./serializeReporter";
import { serializeResolution } from "./serializeResolution";

const log = createLogger("migrator:converter:utils:getJiraExportJson");

type Options = {
  projectKey: string;
};

/**
 * Преобразовывает задачу YouTrack в задачу Jira.
 *
 * @param youtrackIssue Объект с данными по задаче YouTrack
 * @returns
 */
const convertIssue = (youtrackIssue: Issue, { projectKey }: Options) => {
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
    resolution: serializeResolution(youtrackIssue.fields),

    labels: serializeLabels(youtrackIssue),
    components: serializeComponent(youtrackIssue.fields),

    assignee: serializeAssignee(youtrackIssue.fields),
    reporter: serializeReporter(youtrackIssue),

    customFieldValues: serializeIssueCustomFieldValues(youtrackIssue, { projectKey }),
    originalEstimate: serializeIssueEstimation(youtrackIssue.fields),
  };

  return data;
};

export const getJiraExportJson = async (ytIssues: AsyncGenerator<Issue>, { projectKey }: { projectKey: string }) => {
  const issues: JiraExportIssue[] = [];

  log("Convert");

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
        description: "Merchant Test project description",
        components: getComponents(),
        issues,
      },
    ],
  };
};

// @todo [ajile]: В задаче YT хранится релизная версия и Fix versions, можно релизы тоже перенести в Jira
// @todo [ajile]: Учитывать On Production при определении статуса задачи для фронтов
