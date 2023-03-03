const jiraEpicStatusType = [
  { id: "10016", name: "To Do" },
  { id: "10017", name: "In Progress" },
  { id: "10018", name: "Done" },
] as const;

type JiraEpicStatusList = typeof jiraEpicStatusType;
type JiraEpicStatus = JiraEpicStatusList[number];

/**
 * Имя типа задачи в Jira.
 */
export type JiraEpicStatusName = JiraEpicStatus["name"];

/**
 * Идентификатор типа задачи в Jira.
 */
export type JiraEpicStatusId = JiraEpicStatus["id"];
