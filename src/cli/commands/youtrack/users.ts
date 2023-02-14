import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "users";

export const describe = "Get user list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack>
): Promise<void> {
  const result = await argv.youtrack.users.all({ $top: 100000 });
  process.stdout.write(JSON.stringify(result));
};
