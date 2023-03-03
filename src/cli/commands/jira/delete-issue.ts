import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "delete-issue <id>";

export const describe = "Deletes issue by id";

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira & { id: string }>): Promise<void> {
  const issue = await argv.jira.deleteIssue(argv.id);
  console.log(issue);
};
