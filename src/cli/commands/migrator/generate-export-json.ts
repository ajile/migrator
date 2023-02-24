import { ArgumentsCamelCase } from "yargs";
import { getJiraExportJson } from "../../../converter";
import { YargsArgumentsMigrator } from "./types";
// import issues from "../../../../examples/youtrack/issues.json";
import { Issue } from "youtrack-rest-client";

export const command = "generate-export-json";

export const describe = "Generates JSON to export YouTrack issues to Jira";

export const builder = {
  "issue-id": {
    type: "string",
  },
};

type Argv = ArgumentsCamelCase<YargsArgumentsMigrator & { "issue-id": string }>;
export const handler = async function (argv: Argv): Promise<void> {
  // console.log(123);
  const results = await argv.youtrack.post(`issuesGetter/count`, {
    params: { fields: "count", $top: -1 },
    data: { query: "project: {Merchant Services}", unresolvedOnly: false, folder: null },
  });
  console.log(results);
  // const issues = await argv.youtrack.issues.search(
  //   // "project: {Merchant Services} tag: {Product Rework}"
  //   "project: {Merchant Services}"
  // );
  // console.log(JSON.stringify(issues));
  // const json = getJiraExportJson(issues as unknown as Issue[]);
  // console.log(JSON.stringify(json));
};
