import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { getFieldValue } from "../utils/getFieldValue";
import { serializeUser } from "./serializeUser";

const log = createLogger("migrator:converter:fields:serializeIssueTester");

export const serializeIssueTester = (fields: IssueCustomField[] = []) => {
  const tester = getFieldValue(fields, YouTrackFieldName.TESTER);

  log(`Looging for tester`);

  // @todo [ajile]: Test it
  return tester?.id ? serializeUser(tester) : undefined;
};
