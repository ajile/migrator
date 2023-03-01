import { JiraIssueLinkTypeName } from "../jira/link";
import { YoutrackIssueLinkTypeInward, YoutrackIssueLinkTypeOutward } from "../youtrack/link";

export const jiraIssueLinkTypeByYouTrackIssueLinkType: Partial<
  Record<YoutrackIssueLinkTypeOutward | YoutrackIssueLinkTypeInward, JiraIssueLinkTypeName>
> = {
  "relates to": "Relates", // aka relates to
  "is required for": "Blocks", //? aka blocks - OK
  duplicates: "Duplicate", // aka duplicates - OK
  "subtask of": "Consist", // aka is part of — OK
  "As measured by": "Relates", // aka aka relates to
};
