import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { serializeUser } from "./serializeUser";
import { getFieldValue } from "./getFieldValue";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";

const log = createLogger("migrator:converter:fields:serializeAssignee");

export const serializeAssignee = (fields: IssueCustomField[] = []) => {
  const assignee = getFieldValue(fields, YouTrackFieldName.ASSIGNEE);

  log(`Get assignee`);

  return assignee?.id ? serializeUser(assignee) : undefined;
};
