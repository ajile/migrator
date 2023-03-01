export const youtrackIssueLinkTypes = [
  {
    id: "57-0",
    name: "Relates",
    inward: "relates to",
    outward: "relates to",
  },
  {
    id: "57-1",
    name: "Depend",
    inward: "is required for",
    outward: "depends on",
  },
  {
    id: "57-2",
    name: "Duplicate",
    inward: "is duplicated by",
    outward: "duplicates",
  },
  {
    id: "57-3",
    name: "Subtask",
    inward: "parent for",
    outward: "subtask of",
  },
  {
    id: "57-4",
    name: "Contribution",
    inward: "Contributes to",
    outward: "As measured by",
  },
] as const;

type YoutrackIssueLinkTypeList = typeof youtrackIssueLinkTypes;
type YoutrackIssueLinkType = YoutrackIssueLinkTypeList[number];

/**
 * Имя компонента в Jira.
 */
export type YoutrackIssueLinkTypeName = YoutrackIssueLinkType["name"];
export type YoutrackIssueLinkTypeInward = YoutrackIssueLinkType["inward"];
export type YoutrackIssueLinkTypeOutward = YoutrackIssueLinkType["outward"];

/**
 * Идентификатор компонента в Jira.
 */
export type YoutrackIssueLinkTypeId = YoutrackIssueLinkType["id"];
