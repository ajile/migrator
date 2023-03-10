import { JiraIssueStatusName } from "../jira/status";
import { YoutrackStatus } from "../youtrack/status";

export const jiraIssueStatusNameByYouTrackIssueStatusId: Record<YoutrackStatus, JiraIssueStatusName> = {
  [YoutrackStatus.BACKLOG]: "Open",
  [YoutrackStatus.BLOCKED]: "Open",
  [YoutrackStatus.CANT_REPRODUCE]: "Won't fix",
  [YoutrackStatus.CODE_REVIEW]: "Code Review",
  [YoutrackStatus.COMPLETED]: "Completed",
  [YoutrackStatus.DONE]: "Completed",
  [YoutrackStatus.DUPLICATE]: "Won't fix",
  [YoutrackStatus.FIXED]: "Completed",
  [YoutrackStatus.IN_EXPERIMENT]: "Open",
  [YoutrackStatus.IN_PROGRESS]: "In Progress",
  [YoutrackStatus.IN_REVIEW]: "Open",
  [YoutrackStatus.IN_TESTING]: "Testing",
  [YoutrackStatus.NEED_DESIGN]: "Open",
  [YoutrackStatus.ON_HOLD]: "Testing On Hold",
  [YoutrackStatus.OPEN]: "Open",
  [YoutrackStatus.PLAN]: "Open",
  [YoutrackStatus.PM_REVIEW]: "Completed",
  [YoutrackStatus.READY_FOR_TEST]: "Ready For Testing",
  [YoutrackStatus.RELEASED]: "Completed",
  [YoutrackStatus.RESOLVED]: "Completed",
  [YoutrackStatus.SELECTED_FOR_DEVELOPMENT]: "Open",
  [YoutrackStatus.TEST123]: "Open",
  [YoutrackStatus.TO_BE_DISCUSSED]: "Open",
  [YoutrackStatus.UNSCHEDULED]: "Open",
  [YoutrackStatus.WAITING_FOR_RELEASE]: "Waiting For Release",
  [YoutrackStatus.WON_T_FIX]: "Won't fix",
};
