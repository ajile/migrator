import { ArgumentsCamelCase } from "yargs";
import { jiraMiddleware } from "../../middlewares";
import { YargsArguments } from "../../types";

export const command = "jira <command>";

export const describe = "";

export const builder = function (yargs) {
  return yargs
    .middleware(jiraMiddleware)
    .command(require("./components"))
    .command(require("./field-screens"))
    .command(require("./fields"))
    .command(require("./issue-types"))
    .command(require("./issue"))
    .command(require("./priorities"))
    .command(require("./projects"))
    .command(require("./screens"))
    .command(require("./statuses"))
    .command(require("./users"));
};

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArguments>
): Promise<void> {
  console.log(argv);
};
