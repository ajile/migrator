//@ts-nocheck
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "list-field-options";

export const describe = "Get field options";

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira>): Promise<void> {
  const result = await argv.jira.doRequest(
    argv.jira.makeRequestHeader(
      argv.jira.makeUri({
        // Getting Epic Status
        pathname: `/field/customfield_10012/context/10112/option`,
      })
    )
  );

  process.stdout.write(JSON.stringify(result));
};
