import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "../utils/getFieldValue";

const log = createLogger("migrator:converter:utils:serializeIssueEstimation");

export const serializeIssueEstimation = (fields: IssueCustomField[] = []) => {
  const estimation = getFieldValue(fields, YouTrackFieldName.ESTIMATION);

  log(`Invoked`);

  return estimation?.seconds ? `PT${estimation?.seconds / 60}M` : undefined;
};
