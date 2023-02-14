import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "components <project-id>";

export const describe = "Get component list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { 'project-id': string }>
): Promise<void> {
  const result = await argv.jira.listComponents(argv.projectId);
  process.stdout.write(JSON.stringify(result));
};
