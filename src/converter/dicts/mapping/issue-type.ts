import { JiraIssueTypeName } from "../jira/issue-type";
import { YoutrackIssueType } from "../youtrack/issue-type";

export const jiraIssueTypeNameByYouTrackIssueTypeId: Record<YoutrackIssueType, JiraIssueTypeName> = {
  [YoutrackIssueType.BUG]: "Bug",
  [YoutrackIssueType.EPIC]: "Epic",
  [YoutrackIssueType.FEATURE]: "Task",
  [YoutrackIssueType.KR]: "Task",
  [YoutrackIssueType.OBJECTIVE]: "Task",
  [YoutrackIssueType.REQUEST]: "Task",
  [YoutrackIssueType.SUPPORT]: "Task",
  [YoutrackIssueType.TASK]: "Task",
};
