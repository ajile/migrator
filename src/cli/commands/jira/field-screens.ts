//@ts-nocheck
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "field-screens <field-id>";

export const describe = "Get field list";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsJira & { fieldId: string }>
): Promise<void> {
  const result = await argv.jira.doRequest(argv.jira.makeRequestHeader(argv.jira.makeUri({
    pathname: `/field/${argv.fieldId}/screens`,
  })));
  process.stdout.write(JSON.stringify(result));
};

