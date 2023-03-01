export const jiraIssueLinkTypes = [
  {
    id: "10000",
    name: "Blocks",
    inward: "is blocked by",
    outward: "blocks",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10000",
  },
  {
    id: "10009",
    name: "Consist",
    inward: "consists of",
    outward: "is part of",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10009",
  },
  {
    id: "10002",
    name: "Duplicate",
    inward: "is duplicated by",
    outward: "duplicates",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10002",
  },
  {
    id: "10029",
    name: "Polaris datapoint issue link",
    inward: "added to idea",
    outward: "is idea for",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10029",
  },
  {
    id: "10020",
    name: "Polaris issue link",
    inward: "is implemented by",
    outward: "implements",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10020",
  },
  {
    id: "10028",
    name: "Polaris merge issue link",
    inward: "merged into",
    outward: "merged from",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10028",
  },
  {
    id: "10003",
    name: "Relates",
    inward: "relates to",
    outward: "relates to",
    self: "https://joom-team.atlassian.net/rest/api/2/issueLinkType/10003",
  },
] as const;

type JiraIssueLinkTypeList = typeof jiraIssueLinkTypes;
type JiraIssueLinkType = JiraIssueLinkTypeList[number];

/**
 * Имя компонента в Jira.
 */
export type JiraIssueLinkTypeName = JiraIssueLinkType["name"];
export type JiraIssueLinkTypeInward = JiraIssueLinkType["inward"];
export type JiraIssueLinkTypeOutward = JiraIssueLinkType["outward"];
/**
 * Идентификатор компонента в Jira.
 */
export type JiraIssueLinkTypeId = JiraIssueLinkType["id"];
