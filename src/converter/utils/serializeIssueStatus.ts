import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { jiraIssueStatusNameByYouTrackIssueStatusId } from "../dicts/mapping/issue-status";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "../utils/getFieldValue";

const log = createLogger("migrator:converter:utils:serializeIssueStatus");

export const serializeIssueStatus = (fields: IssueCustomField[] = []) => {
  const stateId = getFieldValue(fields || [], YouTrackFieldName.STATE);

  log(`YouTrack state ID is`, stateId);

  if (!stateId) {
    throw new Error("No `stateId` in YouTrack issue found!");
  }

  return jiraIssueStatusNameByYouTrackIssueStatusId[stateId];
};
