import { ArgumentsCamelCase } from "yargs";
import { Issue } from "youtrack-rest-client";
import youTrackIssueMock from "../../../examples/youtrack-issue.json";
import { convertYouTrackToJira } from "../../converter";
import {
  jiraMiddleware,
  JiraMiddlewareYargsArguments,
  youtrackMiddleware,
  YouTrackMiddlewareYargsArguments,
} from "../middlewares";
import { YargsArguments as YargsArgumentsBase } from "../types";

type YargsArguments = ArgumentsCamelCase<
  YargsArgumentsBase &
    JiraMiddlewareYargsArguments &
    YouTrackMiddlewareYargsArguments
>;

export const command = "run";
export const describe = "An command for debugging purpose!";
export const builder = (yargs) =>
  yargs.middleware(jiraMiddleware).middleware(youtrackMiddleware);

export const handler = async function (argv: YargsArguments): Promise<void> {
  // const youtrackIssue = await argv.youtrack.issues.byId('MERCHANT-9044')
  // console.log(`youtrackIssue`, youtrackIssue);

  // const issue = convertYouTrackToJira(youtrackIssue);
  const issue = convertYouTrackToJira(youTrackIssueMock as unknown as Issue);
  console.log(JSON.stringify(issue));
  // console.log(await argv.jira.addNewIssue(issue));

  // MERCHANT-9044

  // var jira = new JiraApi({
  //   apiVersion: "2",
  //   host: argv.jiraApiHost,
  //   password: argv.jiraApiToken,
  //   protocol: "https",
  //   strictSSL: true,
  //   username: argv.jiraUsername,
  // });

  // console.log(await jira.addNewIssue(issue));
};
