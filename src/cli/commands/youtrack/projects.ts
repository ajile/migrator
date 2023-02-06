import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "projects";

export const describe = "Get project list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack & { id: string }>
): Promise<void> {
  const issue = await argv.youtrack.projects.all();
  process.stdout.write(JSON.stringify(issue));
};
