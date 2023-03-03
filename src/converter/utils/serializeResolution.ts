import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { JiraResolutionName } from "../dicts/jira/resolution";
import { jiraResolutionByStatus } from "../dicts/mapping/issue-resolution";
import { serializeIssueStatus } from "./serializeIssueStatus";

const log = createLogger("migrator:converter:utils:serializeResolution");

export const serializeResolution = (fields: IssueCustomField[] = []): JiraResolutionName | undefined => {
  const status = serializeIssueStatus(fields);

  log(`YouTrack status is`, status);

  if (!status) {
    throw new Error("No `status` in YouTrack issue found!");
  }

  return jiraResolutionByStatus[status];
};
