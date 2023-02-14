//@ts-nocheck
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "permissions";

export const describe = "Get all permission list";

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira>): Promise<void> {
  const result = await argv.jira.doRequest(
    argv.jira.makeRequestHeader(
      argv.jira.makeUri({
        pathname: `/permissions`,
      })
    )
  );
  process.stdout.write(JSON.stringify(result));
};
