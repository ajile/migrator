import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "../utils/getFieldValue";
import { serializeUser } from "../utils/serializeUser";

const log = createLogger("migrator:converter:utils:serializeIssueTester");

export const serializeIssueTester = (fields: IssueCustomField[] = []) => {
  const tester = getFieldValue(fields, YouTrackFieldName.TESTER);

  log(`Looking for tester`);

  return tester?.id ? serializeUser(tester) : undefined;
};
