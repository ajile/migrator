import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "issue-link-types";

export const describe = "Get issue link type list";

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira>): Promise<void> {
  const result = await argv.jira.listIssueLinkTypes();
  process.stdout.write(JSON.stringify(result));
};
