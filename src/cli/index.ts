import "dotenv/config";
import yargs from "yargs";
import packageFile from "../../package.json";

module.exports = yargs
  .scriptName("migrator")
  .usage("$0 <cmd> [args]")
  .version(packageFile.version)
  .command(require("./commands/jira"))
  .command(require("./commands/youtrack"))
  .command(require("./commands/generate"));
