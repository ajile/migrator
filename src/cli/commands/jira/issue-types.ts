import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "issue-types";

export const describe = "Get issue types";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira>
): Promise<void> {
  const result = await argv.jira.listIssueTypes();
  process.stdout.write(JSON.stringify(result));
};
