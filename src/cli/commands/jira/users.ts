import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "users";

export const describe = "Get user list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { id: string }>
): Promise<void> {
  const result = await argv.jira.getUsers(0, 10000);
  process.stdout.write(JSON.stringify(result));
};
