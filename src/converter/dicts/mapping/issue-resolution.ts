import { JiraResolutionName } from "../jira/resolution";
import { JiraIssueStatusName } from "../jira/status";

export const jiraResolutionByStatus: Record<JiraIssueStatusName, JiraResolutionName | undefined> = {
  "Awaiting Approval": undefined,
  Backlog: undefined,
  Blocked: undefined,
  "Bug Fixing": undefined,
  "Build Broken": undefined,
  Building: undefined,
  Cancelled: undefined,
  Closed: "Done",
  "Code Review": undefined,
  Completed: "Done",
  Delivered: undefined,
  Delivery: undefined,
  Done: "Done",
  "In Discovery": undefined,
  "In Progress": undefined,
  "In Review": undefined,
  "In Testing": undefined,
  "Need Info": undefined,
  "On Hold": undefined,
  Open: undefined,
  Payed: undefined,
  "Payment In Progress": undefined,
  Prepare: undefined,
  "Ready For Deploy": undefined,
  "Ready For Test": undefined,
  "Ready For Testing": undefined,
  Released: "Done",
  Releasing: undefined,
  Reopened: undefined,
  Resolved: "Done",
  "Selected For Development": undefined,
  Snipelt: undefined,
  Tested: undefined,
  Testing: undefined,
  "Testing On Hold": undefined,
  "To Do": undefined,
  "Waiting For Customer": undefined,
  "Waiting For Invoice": undefined,
  "Waiting For Payment": undefined,
  "Waiting For Release": undefined,
  "Won't fix": "Won't Do",
  "Готовим К Выдаче": undefined,
  "Ожидаем Технику": undefined,
};
