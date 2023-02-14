import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "./getFieldValue";
import { serializeUser } from "./serializeUser";

export const serializeIssueTester = (fields: IssueCustomField[] = []) => {
  const tester = getFieldValue(fields, YouTrackFieldName.TESTER);

  // @todo [ajile]: Test it
  return tester?.id ? serializeUser(tester) : undefined;
};
