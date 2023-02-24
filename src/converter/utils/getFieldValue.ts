import createLogger from "debug";
import { ReducedUser } from "youtrack-rest-client";
import { IssueCustomField } from "youtrack-rest-client/dist/entities/issueCustomField";
import { YoutrackDevPlatform } from "../dicts/youtrack/dev-platform";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { YoutrackIssueType } from "../dicts/youtrack/issue-type";
import { YouTrackPriority } from "../dicts/youtrack/priority";
import { YoutrackStatus } from "../dicts/youtrack/status";
import { YoutrackSubsystem } from "../dicts/youtrack/subsystem";

const log = createLogger("migrator:converter:utils:getFieldValue");

type UserValue = ReducedUser;
type EnumValue<T> = T;
type PeriodValue = {
  seconds?: number;
  minutes?: number;
};

type ReturnShape = {
  [YouTrackFieldName.ASSIGNEE]: UserValue;
  [YouTrackFieldName.DEV_PLATFORM]: EnumValue<YoutrackDevPlatform>;
  [YouTrackFieldName.ESTIMATION]: PeriodValue;
  [YouTrackFieldName.FIX_VERSIONS]: never;
  [YouTrackFieldName.MERCHANT_OBJECTIVE]: never;
  [YouTrackFieldName.ON_PRODUCTION]: never;
  [YouTrackFieldName.PRIORITY]: EnumValue<YouTrackPriority>;
  [YouTrackFieldName.QA_ESTIMATION]: never;
  [YouTrackFieldName.QUARTER]: never;
  [YouTrackFieldName.RELEASE_VERSION]: never;
  [YouTrackFieldName.RELEASED_AT]: never;
  [YouTrackFieldName.SPENT_TIME]: never;
  [YouTrackFieldName.START_DATE]: never;
  [YouTrackFieldName.STATE]: EnumValue<YoutrackStatus>;
  [YouTrackFieldName.SUBSYSTEM]: EnumValue<YoutrackSubsystem>;
  [YouTrackFieldName.TESTER]: UserValue;
  [YouTrackFieldName.TYPE]: EnumValue<YoutrackIssueType>;
};

function getFieldValue<T extends keyof ReturnShape>(fields: IssueCustomField[], fieldId: T): ReturnShape[T] | undefined;
function getFieldValue(
  fields: IssueCustomField[],
  fieldId: keyof ReturnShape
): ReturnShape[keyof ReturnShape] | undefined {
  const fieldValue = fields.find((field) => field.id === fieldId)?.value;

  log(`Field ID ${fieldId} value requested`);

  if (!fieldValue) {
    return undefined;
  }

  switch (fieldId) {
    case YouTrackFieldName.ESTIMATION:
      return {
        seconds: fieldValue.minutes ? fieldValue.minutes * 60 : undefined,
        minutes: fieldValue.minutes,
      };
    case YouTrackFieldName.DEV_PLATFORM:
    case YouTrackFieldName.PRIORITY:
    case YouTrackFieldName.STATE:
    case YouTrackFieldName.SUBSYSTEM:
    case YouTrackFieldName.TYPE:
      return fieldValue.id as any;
    case YouTrackFieldName.ASSIGNEE:
    case YouTrackFieldName.TESTER:
      log(`Field ID ${fieldId} value is`, fieldValue.id);
      return fieldValue as UserValue;
  }

  return undefined;
}

export { getFieldValue };
