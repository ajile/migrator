import JiraApi from "jira-client";

export const jiraMiddleware = function (argv) {
  argv.jira = new JiraApi({
    apiVersion: "2",
    host: argv.jiraApiHost,
    password: argv.jiraApiToken,
    protocol: "https",
    strictSSL: true,
    username: argv.jiraUsername,
  });
};

export type JiraMiddlewareYargsArguments = { jira: JiraApi };
