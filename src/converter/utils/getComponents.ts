import { jiraComponents } from "../dicts/jira/component";

/**
 * Возвращает статичный список компонентов проекта.
 */
export const getComponents = () => {
  return jiraComponents.map((component) => ({
    description: component.description,
    lead: component.lead,
    name: component.name,
  }));
};
