const jiraIssueType = [
  { name: "Bug", id: "10009" },
  { name: "Epic", id: "10000" },
  { name: "Project", id: "10031" },
  { name: "Story", id: "10008" },
  { name: "Sub Task", id: "10007" },
  { name: "Task", id: "10006" },
] as const;

type JiraIssueTypeList = typeof jiraIssueType;
type JiraIssueType = JiraIssueTypeList[number];

/**
 * Имя типа задачи в Jira.
 */
export type JiraIssueTypeName = JiraIssueType["name"];

/**
 * Идентификатор типа задачи в Jira.
 */
export type JiraIssueTypeId = JiraIssueType["id"];
