import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "issue <id>";

export const describe = "Get particular issue by id";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack & { id: string }>
): Promise<void> {
  const issue = await argv.youtrack.issues.byId(argv.id);
  process.stdout.write(JSON.stringify(issue));
};
