import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { jiraIssueStatusNameByYouTrackIssueStatusId } from "../dicts/mapping/issue-status";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "./getFieldValue";

export const serializeIssueStatus = (fields: IssueCustomField[] = []) => {
  const stateId = getFieldValue(fields || [], YouTrackFieldName.STATE);

  if (!stateId) {
    throw new Error("No `stateId` in YouTrack issue found!");
  }

  return jiraIssueStatusNameByYouTrackIssueStatusId[stateId];
};
