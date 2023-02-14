//@ts-nocheck
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "resolutions";

export const describe = "Get all resolution list";

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira>): Promise<void> {
  const result = await argv.jira.doRequest(
    argv.jira.makeRequestHeader(
      argv.jira.makeUri({
        pathname: `/resolution/search`,
        query: {
          maxResults: 100500,
        },
      })
    )
  );
  process.stdout.write(JSON.stringify(result));
};
