import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "fields";

export const describe = "Get field list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { id: string }>
): Promise<void> {
  const result = await argv.jira.listFields();
  process.stdout.write(JSON.stringify(result));
};
