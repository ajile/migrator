import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "issue-link-types";

export const describe = "Get issue link type list";

const fields = [
  "id",
  "name",
  "localizedName",
  "sourceToTarget",
  "localizedSourceToTarget",
  "targetToSource",
  "localizedTargetToSource",
  "directed",
  "aggregation",
  "readOnly",
];

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsYouTrack>): Promise<void> {
  const results = (await argv.youtrack.get("issueLinkTypes", { params: { fields: fields.join(",") } })) as unknown[];

  process.stdout.write(JSON.stringify(results));
};
