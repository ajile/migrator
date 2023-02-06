import JiraApi from "jira-client";
import { Issue, IssueTag, ReducedUser } from "youtrack-rest-client";
import { JiraComponents } from "../dicts/jira-components";
import { JiraPriority } from "../dicts/jira-priority";
import { YouTrackFieldName } from "../dicts/youtrack-fields";
import { YouTrackPriority } from "../dicts/youtrack-priority";

export enum WellKnownFieldName {
  AGGREGATE_TIME_ORIGINAL_ESTIMATE = "aggregatetimeoriginalestimate",
  AGGREGATEPROGRESS = "aggregateprogress",
  AGGREGATETIMEESTIMATE = "aggregatetimeestimate",
  AGGREGATETIMESPENT = "aggregatetimespent",
  ASSIGNEE = "assignee",
  ATTACHMENT = "attachment",
  COMMENT = "comment",
  COMPONENTS = "components",
  CREATED = "created",
  CREATOR = "creator",
  DESCRIPTION = "description",
  DEV_PLATFORM = "customfield_10349",
  DUEDATE = "duedate",
  ENVIRONMENT = "environment",
  EPIC_NAME = "customfield_10011",
  EPIC_STATUS = "customfield_10012",
  FIX_VERSIONS = "fixVersions",
  ISSUEKEY = "issuekey",
  ISSUELINKS = "issuelinks",
  ISSUERESTRICTION = "issuerestriction",
  ISSUETYPE = "issuetype",
  LABELS = "labels",
  LAST_VIEWED = "lastViewed",
  MAIN_BRANCH_NAME = "customfield_10380",
  PRIORITY = "priority",
  PROGRESS = "progress",
  PROJECT = "project",
  REPORTER = "reporter",
  RESOLUTION = "resolution",
  RESOLUTION_DATE = "resolutiondate",
  SECURITY = "security",
  SEVERITY = "customfield_10044",
  STATUS = "status",
  STATUS_CATEGORY = "statusCategory",
  STATUSCATEGORYCHANGEDATE = "statuscategorychangedate",
  SUBSYSTEMS = "customfield_10346",
  SUBTASKS = "subtasks",
  SUMMARY = "summary",
  TEST_BENCH_URL = "customfield_10350",
  TESTER = "customfield_10348",
  THUMBNAIL = "thumbnail",
  TIMEESTIMATE = "timeestimate",
  TIMEORIGINALESTIMATE = "timeoriginalestimate",
  TIMESPENT = "timespent",
  TIMETRACKING = "timetracking",
  UPDATED = "updated",
  VERSIONS = "versions",
  VOTES = "votes",
  WATCHES = "watches",
  WORKLOG = "worklog",
  WORKRATIO = "workratio",
}

const getFieldValue = function (
  youtrackIssue: Issue,
  fieldId: YouTrackFieldName
) {
  return youtrackIssue.fields?.find((field) => field.id === fieldId)?.value;
};

const convertYouTrackTagToJiraTag = (youtrackIssueTag: IssueTag) =>
  youtrackIssueTag.name.replace(/\s/g, "-").toLowerCase();

const convertYouTrackUserToJiraUser = (youtrackUser: ReducedUser) => {
  // Сгенерируйте мапу
  const userMap = require("../dicts/users.json");
  return userMap[youtrackUser.id];
};

const getYouTrackIssueType = (youtrackIssue: Issue) => {
  return "10006";
  return youtrackIssue.fields?.find((field) => field.name === "Type");
};

const getYouTrackIssueStatus = (youtrackIssue: Issue) => {
  return youtrackIssue.fields?.find((field) => field.name === "State");
};

const getJiraIssueComponent = (youtrackIssue: Issue) => {
  const subsystem = getFieldValue(youtrackIssue, YouTrackFieldName.SUBSYSTEM);
  const devPlatform = getFieldValue(
    youtrackIssue,
    YouTrackFieldName.DEV_PLATFORM
  );

  if (subsystem?.name === "Product") {
    return JiraComponents.DEV_PLATFORM_PRODUCT;
  }

  if (devPlatform?.name === "Frontend") {
    return JiraComponents.DEV_PLATFORM_FRONTEND;
  }

  if (devPlatform?.name === "Backend") {
    return JiraComponents.DEV_PLATFORM_BACKEND;
  }
};

const getLabels = (youtrackIssue: Issue) => {
  const labels = youtrackIssue.tags?.map(convertYouTrackTagToJiraTag) || [];
  const subsystem = getFieldValue(youtrackIssue, YouTrackFieldName.SUBSYSTEM);

  if (subsystem?.name === "Admin") {
    labels.push("Admin");
  }

  return labels;
};

const getPriority = (youtrackIssue: Issue) => {
  const priority = getFieldValue(
    youtrackIssue,
    YouTrackFieldName.PRIORITY
  )?.name;

  switch (priority) {
    case YouTrackPriority.BLOCKER:
      return JiraPriority.BLOCKER;
    case YouTrackPriority.CRITICAL:
      return JiraPriority.HIGH;
    case YouTrackPriority.MAJOR:
      return JiraPriority.HIGH;
    case YouTrackPriority.MINOR:
      return JiraPriority.LOW;
    case YouTrackPriority.NORMAL:
      return JiraPriority.MEDIUM;
    default:
      return JiraPriority.MEDIUM;
  }
};

export const convertYouTrackToJira = (youtrackIssue: Issue) => {
  const data: JiraApi.IssueObject = {
    // id: "40633",
    // self: "https://joom-team.atlassian.net/rest/api/2/issue/40633",
    key: `MERCHANT-${youtrackIssue.numberInProject}`,
    project: { id: "10034" },
  };

  // @ts-expect-error
  const fields: Record<WellKnownFieldName, unknown> = {
    summary: youtrackIssue.summary,

    // @error: Field 'updated' cannot be set. It is not on the appropriate screen, or unknown.
    // updated: youtrackIssue.updated,

    project: { key: "MERCHANT" },

    // @todo [ajile]: I’m not sure it’s correct format
    labels: getLabels(youtrackIssue),

    // @error: Field 'reporter' cannot be set. It is not on the appropriate screen, or unknown.
    // reporter:
    //   youtrackIssue.reporter &&
    //   {id: convertYouTrackUserToJiraUser(youtrackIssue.reporter)},
    // creator:
    //   youtrackIssue.reporter &&
    //   {id: convertYouTrackUserToJiraUser(youtrackIssue.reporter)},

    // @todo [ajile]: Thereis no such field in Jira
    // updater

    // @todo [ajile]: Figure out format in YouTrack and Jira
    // @error: Field 'comment' cannot be set. It is not on the appropriate screen, or unknown.
    // comment: {
    //   comments: youtrackIssue.comments,
    // },

    // @error: Field 'created' cannot be set. It is not on the appropriate screen, or unknown.
    // created: youtrackIssue.created,

    // @todo [ajile]: Convert MD to Jira format
    description: youtrackIssue.description,

    priority: getPriority(youtrackIssue)
      ? { id: getPriority(youtrackIssue) }
      : undefined,

    // @todo [ajile]: Import “links”

    issuetype: { id: getYouTrackIssueType(youtrackIssue) },

    // status: { id: "10027" },
    // resolutiondate: youtrackIssue.resolved
    //   ? new Date(youtrackIssue.resolved)
    //   : undefined,

    components: getJiraIssueComponent(youtrackIssue)
      ? [{ id: getJiraIssueComponent(youtrackIssue) }]
      : undefined,
  };

  data.fields = fields;

  return data;
};
