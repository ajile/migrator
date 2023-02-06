import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "statuses";

export const describe = "Get status list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { id: string }>
): Promise<void> {
  const result = await argv.jira.listStatus();
  process.stdout.write(JSON.stringify(result));
};
