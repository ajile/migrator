import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { serializeUser } from "./serializeUser";

const log = createLogger("migrator:converter:fields:serializeReporter");

export const serializeReporter = (issue: Issue) => {
  let userId;

  if (issue.reporter) {
    log(`Looking Jira user ID for YouTrack user ID`, issue.reporter.id);
    userId = serializeUser(issue.reporter);

    if (!userId) {
      throw new Error("No Jira user found!");
    }
  }

  return userId;
};
