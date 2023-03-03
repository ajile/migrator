import j2m from "jira2md";
import createLogger from "debug";
import { IssueComment } from "youtrack-rest-client";
import { JiraExportIssueComment } from "../types";
import { serializeUser } from "../utils/serializeUser";

const log = createLogger("migrator:converter:utils:serializeIssueComments");

export const serializeIssueComments = (comments: IssueComment[] = []) => {
  log("Comments count", comments.length);

  return comments.reduce<JiraExportIssueComment[]>((acc, comment) => {
    if (comment.deleted) {
      return acc;
    }

    if (comment.author === undefined || comment.author === null) {
      debugger;
      throw new Error("No `author` found in a comment!");
    }
    if (comment.text === undefined || comment.text === null) {
      debugger;
      throw new Error("No `text` found in a comment!");
    }
    if (comment.created === undefined || comment.created === null) {
      debugger;
      throw new Error("No `created` found in a comment!");
    }

    acc.push({
      body: j2m.to_jira(comment.text),
      author: serializeUser(comment.author),
      created: new Date(comment.created),
      // @todo [ajile]: Add attachments?
    });

    return acc;
  }, []);
};

// @todo [ajile]: https://support.atlassian.com/jira-cloud-administration/docs/import-data-from-json/
// "body": "This private comment",
//                             "author": "557057:1a8aeee5-40e9-413a-9f4e-2f074f09644a",
//                             "created": "2012-08-31T17:59:02.161+0100",
//                             "updated": "2012-08-31T17:59:02.161+0100",
//                             "properties
