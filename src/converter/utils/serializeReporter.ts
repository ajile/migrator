import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { serializeUser } from "../utils/serializeUser";

const log = createLogger("migrator:converter:utils:serializeReporter");

export const serializeReporter = (issue: Issue) => {
  let userId;

  if (issue.reporter) {
    log(`Looking Jira user ID for YouTrack user ID`, issue.reporter.id);
    userId = serializeUser(issue.reporter);

    // @todo: User 145-0, 26-124 and 26-193 have been deleted. I’ve replaced it by myself,
    // for debugging purpose. But we need to figure out what to do in these cases!!!
    if (!userId) {
      throw new Error(`No Jira user found! YT User ID is “${issue.reporter.id}” in ${issue.numberInProject}.`);
    }
  }

  return userId;
};
