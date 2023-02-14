const jiraFields = [
  { name: "Aggregate Time Original Estimate", id: "aggregatetimeoriginalestimate" },
  { name: "Aggregateprogress", id: "aggregateprogress" },
  { name: "Aggregatetimeestimate", id: "aggregatetimeestimate" },
  { name: "Aggregatetimespent", id: "aggregatetimespent" },
  { name: "Assignee", id: "assignee" },
  { name: "Attachment", id: "attachment" },
  { name: "Comment", id: "comment" },
  { name: "Components", id: "components" },
  { name: "Created", id: "created" },
  { name: "Creator", id: "creator" },
  { name: "Description", id: "description" },
  { name: "Dev Platform", id: "customfield_10349" },
  { name: "Duedate", id: "duedate" },
  { name: "Environment", id: "environment" },
  { name: "Epic Link", id: "customfield_10014" },
  { name: "Epic Name", id: "customfield_10011" },
  { name: "Epic Status", id: "customfield_10012" },
  { name: "Fix Versions", id: "fixVersions" },
  { name: "Issuekey", id: "issuekey" },
  { name: "Issuelinks", id: "issuelinks" },
  { name: "Issuerestriction", id: "issuerestriction" },
  { name: "Issuetype", id: "issuetype" },
  { name: "Labels", id: "labels" },
  { name: "Last Viewed", id: "lastViewed" },
  { name: "Main Branch Name", id: "customfield_10380" },
  { name: "Priority", id: "priority" },
  { name: "Progress", id: "progress" },
  { name: "Project", id: "project" },
  { name: "Reporter", id: "reporter" },
  { name: "Resolution", id: "resolution" },
  { name: "Resolution Date", id: "resolutiondate" },
  { name: "Security", id: "security" },
  { name: "Severity", id: "customfield_10044" },
  { name: "Sprint", id: "customfield_10020" },
  { name: "Status", id: "status" },
  { name: "Status Category", id: "statusCategory" },
  { name: "Statuscategorychangedate", id: "statuscategorychangedate" },
  { name: "Subsystems", id: "customfield_10346" },
  { name: "Subtasks", id: "subtasks" },
  { name: "Summary", id: "summary" },
  { name: "Test Bench Url", id: "customfield_10350" },
  { name: "Tester", id: "customfield_10348" },
  { name: "Thumbnail", id: "thumbnail" },
  { name: "Timeestimate", id: "timeestimate" },
  { name: "Timeoriginalestimate", id: "timeoriginalestimate" },
  { name: "Timespent", id: "timespent" },
  { name: "Timetracking", id: "timetracking" },
  { name: "Updated", id: "updated" },
  { name: "Versions", id: "versions" },
  { name: "Votes", id: "votes" },
  { name: "Watches", id: "watches" },
  { name: "Worklog", id: "worklog" },
  { name: "Workratio", id: "workratio" },
] as const;

type JiraFieldList = typeof jiraFields;
type JiraField = JiraFieldList[number];

/**
 * Имя компонента в Jira.
 */
export type JiraFieldName = JiraField["name"];

/**
 * Идентификатор компонента в Jira.
 */
export type JiraFieldId = JiraField["id"];
