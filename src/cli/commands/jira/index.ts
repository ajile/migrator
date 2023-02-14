import { Argv } from "yargs";
import { withJira } from "../../enhancers";

export const command = "jira";

export const describe = "Commands related to communication with Jira REST API";

export const builder = (yargs: Argv) =>
  withJira(yargs)
    .command(require("./components"))
    .command(require("./field-screens"))
    .command(require("./fields"))
    .command(require("./issue-createmeta"))
    .command(require("./issue-types"))
    .command(require("./issue"))
    .command(require("./my-permissions"))
    .command(require("./permissions"))
    .command(require("./priorities"))
    .command(require("./projects"))
    .command(require("./resolutions"))
    .command(require("./screens"))
    .command(require("./statuses"))
    .command(require("./users"));

export const handler = () => {};
