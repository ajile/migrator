import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "issues";

export const describe = "Get issues";

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira>): Promise<void> {
  const issue = await argv.jira.searchJira('project = "MT"', { maxResults: 100 });
  process.stdout.write(JSON.stringify(issue));
};
