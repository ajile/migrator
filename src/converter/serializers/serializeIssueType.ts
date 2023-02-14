import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { jiraIssueTypeNameByYouTrackIssueTypeId } from "../dicts/mapping/issue-type";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "./getFieldValue";

export const serializeIssueType = (fields: IssueCustomField[] = []) => {
  const typeId = getFieldValue(fields || [], YouTrackFieldName.TYPE);

  if (!typeId) {
    throw new Error("No `typeId` in YouTrack issue found!");
  }

  return jiraIssueTypeNameByYouTrackIssueTypeId[typeId];
};
