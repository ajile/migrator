// @ts-nocheck
import { Argv } from "yargs";
import { YouTrack } from "../../adapters/youtrack";

export const withYoutrack = (yargs: Argv) =>
  yargs
    .option("youtrack.api-host", {
      type: "string",
      default: process.env.YOUTRACK_API_HOST,
      describe: "API URL of your YouTrack",
    })
    .option("youtrack.api-token", {
      type: "string",
      default: process.env.YOUTRACK_TOKEN,
      describe: "The access token of the project in YouTrack",
    })
    .demandOption(["youtrack"], "Please provide all arguments to work with this tool")
    .coerce(
      ["youtrack"],
      ({ apiToken = process.env.YOUTRACK_TOKEN, apiHost = process.env.YOUTRACK_API_HOST }) =>
        new YouTrack({
          baseUrl: `https://${apiHost}`,
          token: apiToken!,
        })
    );

export type YouTrackMiddlewareYargsArguments = { youtrack: YouTrack };
