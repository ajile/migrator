export const jiraComponents = [
  {
    id: "10089",
    name: "Dev Platform: Backend",
    description: "Task for backend developers",
    lead: "557058:c131eed8-2be9-4eaf-8dc4-6df29734f5f9",
  },
  {
    id: "10090",
    name: "Dev Platform: Frontend",
    description: "Task for frontend developers",
    lead: "5d3eb1e764af340da4378b0f",
  },
  {
    id: "10114",
    name: "Dev Platform: Product",
    description: "Task for product managers",
    lead: "qm:3783416b-79d7-4b52-9c71-1a09430cb1b5:f6be7d4e-b66d-48ec-b5de-5e98fe951422",
  },
  {
    id: "10115",
    name: "Dev Platform: QA",
    description: "Task for QA engineers",
    lead: "5e4f7f0de7724a0e72636e81",
  },
] as const;

type JiraComponentList = typeof jiraComponents;
type JiraComponent = JiraComponentList[number];

/**
 * Имя компонента в Jira.
 */
export type JiraComponentName = JiraComponent["name"];

/**
 * Идентификатор компонента в Jira.
 */
export type JiraComponentId = JiraComponent["id"];
