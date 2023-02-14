import { ArgumentsCamelCase } from "yargs";
import { getJiraExportJson } from "../../../converter";
import { YargsArgumentsMigrator } from "./types";

export const command = "generate-export-json";

export const describe = "Generates JSON to export YouTrack issues to Jira";

export const builder = {
  "issue-id": {
    type: "string",
  },
};

type Argv = ArgumentsCamelCase<YargsArgumentsMigrator & { "issue-id": string }>;
export const handler = async function (argv: Argv): Promise<void> {
  const issue = await argv.youtrack.issues.byId(argv.issueId);
  const json = getJiraExportJson([issue]);
  console.log(JSON.stringify(json));
};
