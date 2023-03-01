import { Argv } from "yargs";
import { withYoutrack } from "../../enhancers";

export const command = "youtrack";

export const describe = "Commands related to communication with YouTrack REST API";

export const builder = function (yargs: Argv) {
  return withYoutrack(yargs)
    .command(require("./field-bundles-enum"))
    .command(require("./fields"))
    .command(require("./issue-link-types"))
    .command(require("./issue"))
    .command(require("./projects"))
    .command(require("./users"));
};

export const handler = () => {};
