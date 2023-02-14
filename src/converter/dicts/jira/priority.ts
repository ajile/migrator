const jiraIssuePriority = [
  { name: "Blocker", id: "1" },
  { name: "High", id: "2" },
  { name: "Medium", id: "3" },
  { name: "Low", id: "4" },
  { name: "Lowest", id: "5" },
] as const;

type JiraIssuePriorityList = typeof jiraIssuePriority;
type JiraIssuePriority = JiraIssuePriorityList[number];

/**
 * Имя типа задачи в Jira.
 */
export type JiraIssuePriorityName = JiraIssuePriority["name"];

/**
 * Идентификатор типа задачи в Jira.
 */
export type JiraIssuePriorityId = JiraIssuePriority["id"];
