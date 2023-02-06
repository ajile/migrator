import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "priorities";

export const describe = "Get priority list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira>
): Promise<void> {
  const result = await argv.jira.listPriorities();
  process.stdout.write(JSON.stringify(result));
};
