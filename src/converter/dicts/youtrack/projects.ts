export const youtrackProjects = [
  {
    id: "77-15",
    name: "Merchant Services",
    shortName: "MERCHANT",
  },
] as const;

type YoutrackProjectList = typeof youtrackProjects;
type YoutrackProjectType = YoutrackProjectList[number];

/**
 * Имя компонента в Jira.
 */
export type YoutrackProjectName = YoutrackProjectType["name"];

/**
 * Идентификатор компонента в Jira.
 */
export type YoutrackProjectId = YoutrackProjectType["id"];
