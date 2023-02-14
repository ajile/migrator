import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { JiraIssuePriorityName } from "../dicts/jira/priority";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { YouTrackPriority } from "../dicts/youtrack/priority";
import { getFieldValue } from "./getFieldValue";

const log = createLogger("migrator:converter:fields:serializeIssuePriority");

export const serializeIssuePriority = (fields: IssueCustomField[] = []): JiraIssuePriorityName => {
  const priority = getFieldValue(fields, YouTrackFieldName.PRIORITY);

  log("Priority is", priority);

  switch (priority) {
    case YouTrackPriority.BLOCKER:
      return "Blocker";
    case YouTrackPriority.CRITICAL:
      return "High";
    case YouTrackPriority.MAJOR:
      return "High";
    case YouTrackPriority.MINOR:
      return "Low";
    case YouTrackPriority.NORMAL:
      return "Medium";
    default:
      return "Medium";
  }
};
