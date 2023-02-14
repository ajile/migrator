import { Argv } from "yargs";
import { withJira, withYoutrack } from "../../enhancers";
import { YargsArguments } from "../../types";

export const command = "migrator";

export const describe = "Commands related to migration";

export const builder = function (yargs: Argv<YargsArguments>) {
  return withYoutrack(withJira(yargs))
    .command(require("./generate-export-json"))
    .command(require("./generate-user-map"));
};
