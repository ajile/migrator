import { ArgumentsCamelCase } from "yargs";
import { Youtrack } from "youtrack-rest-client";
import { youtrackMiddleware } from "../../middlewares";
import { YargsArguments } from "../../types";

export const command = "youtrack <command>";

export const describe = "";

export const builder = function (yargs) {
  return yargs
    .middleware(youtrackMiddleware)
    .command(require("./field-bundles-enum"))
    .command(require("./fields"))
    .command(require("./projects"))
    .command(require("./users"))
    .command(require("./issue"));
};

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArguments>
): Promise<void> {
  console.log(argv);
};
