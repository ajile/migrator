import { Argv } from "yargs";
import { JiraApi } from "../../adapters/jira";

export const withJira = (yargs: Argv) =>
  yargs
    .option("jira.api-token", {
      type: "string",
      default: process.env.JIRA_TOKEN,
      describe: "The access token of the project in Jira",
    })
    .option("jira.api-host", {
      type: "string",
      default: process.env.JIRA_API_HOST,
      describe: "The Jira URL",
    })
    .option("jira.username", {
      type: "string",
      default: process.env.JIRA_USERNAME,
      describe: "The username in Jira",
    })
    .demandOption(["jira"], "Please provide all arguments to work with this tool")
    .coerce(
      ["jira"],
      ({
        apiToken = process.env.JIRA_TOKEN,
        apiHost = process.env.JIRA_API_HOST,
        username = process.env.JIRA_USERNAME,
      }) =>
        new JiraApi({
          apiVersion: "2",
          host: apiHost,
          password: apiToken,
          protocol: "https",
          strictSSL: true,
          username: username,
        })
    );

export type JiraMiddlewareYargsArguments = { jira: JiraApi };
