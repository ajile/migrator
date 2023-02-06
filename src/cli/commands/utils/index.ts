import { ArgumentsCamelCase } from "yargs";
import { jiraMiddleware, youtrackMiddleware } from "../../middlewares";
import { YargsArguments } from "../../types";

export const command = "utils <command>";

export const describe = "";

export const builder = function (yargs) {
  return yargs
    .middleware(jiraMiddleware)
    .middleware(youtrackMiddleware)
    .command(require("./generate-user-map"));
};

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArguments>
): Promise<void> {
  console.log(argv);
};
