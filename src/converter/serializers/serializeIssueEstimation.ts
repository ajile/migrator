import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "./getFieldValue";

export const serializeIssueEstimation = (fields: IssueCustomField[] = []) => {
  const estimation = getFieldValue(fields, YouTrackFieldName.ESTIMATION);

  return estimation?.seconds ? `PT${estimation?.seconds / 60}M` : undefined;
};
