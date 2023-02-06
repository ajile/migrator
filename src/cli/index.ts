import "dotenv/config";
import yargs from "yargs";
import packageFile from "../../package.json";

module.exports = yargs
  .version(packageFile.version)
  .scriptName("migrator")
  .usage("$0 <cmd> [args]")
  .option("jira-api-token", {
    type: "string",
    default: process.env.JIRA_TOKEN,
    describe: "The access token of the project in Jira",
  })
  .option("jira-api-host", {
    type: "string",
    default: process.env.JIRA_API_HOST,
    describe: "The Jira URL",
  })
  .option("jira-username", {
    type: "string",
    default: process.env.JIRA_USERNAME,
    describe: "The username in Jira",
  })
  .option("youtrack-api-host", {
    type: "string",
    default: process.env.YOUTRACK_API_HOST,
    describe: "API URL of your YouTrack",
  })
  .option("youtrack-api-token", {
    type: "string",
    default: process.env.YOUTRACK_TOKEN,
    describe: "The access token of the project in YouTrack",
  })
  .option("youtrack-project-name", {
    type: "string",
    default: process.env.YOUTRACK_PROJECT,
    describe: "The name of the project in YouTrack",
  })
  .demandOption(
    [
      "jira-api-host",
      "jira-api-token",
      "jira-username",
      "youtrack-api-host",
      "youtrack-api-token",
      "youtrack-project-name",
    ],
    "Please provide all arguments to work with this tool"
  )
  .wrap(100)
  .command(require("./commands/jira"))
  .command(require("./commands/run"))
  .command(require("./commands/utils"))
  .command(require("./commands/youtrack"))
