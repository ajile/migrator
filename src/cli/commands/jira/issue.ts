import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "issue <id>";

export const describe = "Get particular issue by id";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { id: string }>
): Promise<void> {
  const issue = await argv.jira.getIssue(argv.id);
  process.stdout.write(JSON.stringify(issue));
};
