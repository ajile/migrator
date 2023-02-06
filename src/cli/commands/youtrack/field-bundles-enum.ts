import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "field-bundles-enum";

export const describe = "Get field bundles enum list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack & { bundleID: string }>
): Promise<void> {
  let results = await argv.youtrack.get(
    "admin/customFieldSettings/bundles/enum/${bundleID}",
  );

  process.stdout.write(JSON.stringify(results));
};
