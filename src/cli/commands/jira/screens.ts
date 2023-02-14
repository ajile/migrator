import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "screens";

export const describe = "Get screen list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira>
): Promise<void> {
  // @todo [ajile]: Limit 100
  const result = await argv.jira.genericGet("screens");
  process.stdout.write(JSON.stringify(result));
};
