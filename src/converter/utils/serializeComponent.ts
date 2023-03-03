import createLogger from "debug";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { JiraComponentName } from "../dicts/jira/component";
import { YoutrackDevPlatform } from "../dicts/youtrack/dev-platform";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { YoutrackSubsystem } from "../dicts/youtrack/subsystem";
import { getFieldValue } from "../utils/getFieldValue";

const log = createLogger("migrator:converter:utils:serializeComponent");

export const serializeComponent = (fields: IssueCustomField[] = []): JiraComponentName[] => {
  const subsystem = getFieldValue(fields || [], YouTrackFieldName.SUBSYSTEM);
  const devPlatform = getFieldValue(fields || [], YouTrackFieldName.DEV_PLATFORM);

  log("Subsystem", subsystem);
  log("DevPlatform", devPlatform);

  if (subsystem === YoutrackSubsystem.PRODUCT) {
    return ["Dev Platform: Product"];
  }

  if (devPlatform === YoutrackDevPlatform.FRONTEND) {
    return ["Dev Platform: Frontend"];
  }

  if (devPlatform === YoutrackDevPlatform.BACKEND) {
    return ["Dev Platform: Backend"];
  }

  return [];
};
