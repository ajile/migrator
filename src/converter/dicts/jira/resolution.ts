const jiraResolutions = [
  /**
   * Work has been completed on this issue.
   */
  { name: "Done", id: "10000" },

  /**
   * This issue won't be actioned.
   */
  { name: "Won't Do", id: "10001" },

  /**
   * The problem is a duplicate of an existing issue.
   */
  { name: "Duplicate", id: "10002" },

  /**
   * All attempts at reproducing this issue failed, or not enough information was available
   * to reproduce the issue. Reading the code produces no clues as to why this behavior would occur.
   * If more information appears later, please reopen the issue.
   */
  { name: "Cannot Reproduce", id: "10003" },

  /**
   * This issue was not approved.
   */
  { name: "Declined", id: "10004" },
] as const;

type JiraResolutionList = typeof jiraResolutions;
type JiraResolution = JiraResolutionList[number];

/**
 * Имя решения в Jira.
 */
export type JiraResolutionName = JiraResolution["name"];

/**
 * Идентификатор решения в Jira.
 */
export type JiraResolutionId = JiraResolution["id"];
