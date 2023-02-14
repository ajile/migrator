import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "issue-createmeta";

export const builder = {
  "project-id": {
    type: "string",
    alias: "p",
  },
};

export const describe = "Get issue createmeta (including types)";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { projectId: string }>
): Promise<void> {
  const result = await argv.jira.getIssueCreateMetadata({
    projectIds: argv.projectId ? [argv.projectId] : undefined,
    expand: "projects.issuetypes.fields",
  });
  process.stdout.write(JSON.stringify(result));
};
