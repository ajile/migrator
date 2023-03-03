import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "./getFieldValue";
import { serializeUser } from "./serializeUser";

const log = createLogger("migrator:converter:utils:serializeAssignee");

export const serializeAssignee = (fields: IssueCustomField[] = []) => {
  const assignee = getFieldValue(fields, YouTrackFieldName.ASSIGNEE);

  log(`Getting Jira user ID by YouTrack user ID`, assignee?.id);

  return assignee?.id ? serializeUser(assignee) : undefined;
};
