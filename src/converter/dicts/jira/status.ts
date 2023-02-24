const jiraStatuses = [
  { name: "Awaiting Approval", id: "10092" },
  { name: "Backlog", id: "10005" },
  { name: "Blocked", id: "10042" },
  { name: "Bug Fixing", id: "10180" },
  { name: "Build Broken", id: "401" },
  { name: "Building", id: "400" },
  { name: "Cancelled", id: "10053" },
  { name: "Closed", id: "6" },
  { name: "Code Review", id: "10030" },
  { name: "Completed", id: "10027" },
  { name: "Delivered", id: "10072" },
  { name: "Delivery", id: "10115" },
  { name: "Done", id: "10004" },
  { name: "In Discovery", id: "10130" },
  { name: "In Progress", id: "3" },
  { name: "In Review", id: "10058" },
  { name: "In Testing", id: "10044" },
  { name: "Need Info", id: "10047" },
  { name: "On Hold", id: "10164" },
  { name: "Open", id: "1" },
  { name: "Payed", id: "10085" },
  { name: "Payment In Progress", id: "10069" },
  { name: "Prepare", id: "10103" },
  { name: "Ready For Deploy", id: "10161" },
  { name: "Ready For Test", id: "10043" },
  { name: "Ready For Testing", id: "10159" },
  { name: "Released", id: "10046" },
  { name: "Releasing", id: "10131" },
  { name: "Reopened", id: "4" },
  { name: "Resolved", id: "5" },
  { name: "Selected For Development", id: "10006" },
  { name: "Snipelt", id: "10116" },
  { name: "Tested", id: "10045" },
  { name: "Testing", id: "10160" },
  { name: "Testing On Hold", id: "10171" },
  { name: "To Do", id: "10003" },
  { name: "Waiting For Customer", id: "10016" },
  { name: "Waiting For Invoice", id: "10113" },
  { name: "Waiting For Payment", id: "10114" },
  { name: "Waiting For Release", id: "10068" },
  { name: "Won't fix", id: "10163" },
  { name: "Готовим К Выдаче", id: "10110" },
  { name: "Ожидаем Технику", id: "10111" },
] as const;

type JiraIssueStatusList = typeof jiraStatuses;
type JiraIssueStatus = JiraIssueStatusList[number];

/**
 * Имя статуса задачи в Jira.
 */
export type JiraIssueStatusName = JiraIssueStatus["name"];

/**
 * Идентификатор статуса задачи в Jira.
 */
export type JiraIssueStatusId = JiraIssueStatus["id"];
