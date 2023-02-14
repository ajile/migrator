import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "projects";

export const describe = "Get project list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira>
): Promise<void> {
  const result = await argv.jira.listProjects();
  process.stdout.write(JSON.stringify(result));
};
