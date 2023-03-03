import { Argv } from "yargs";
import { withJira, withYoutrack } from "../../enhancers";
import { YargsArguments } from "../../types";

export const command = "generate";

export const describe = "Commands related to generation";

export const builder = function (yargs: Argv<YargsArguments>) {
  return withYoutrack(withJira(yargs))
    .command(require("./issues"))
    .command(require("./links"))
    .command(require("./attachments"))
    .command(require("./comments"))
    .command(require("./user-map"));
};
