import createLogger from "debug";
import { IssueComment } from "youtrack-rest-client";
import { serializeUser } from "./serializeUser";

const log = createLogger("migrator:converter:fields:serializeIssueComments");

export const serializeIssueComments = (comments: IssueComment[] = []) => {
  log("Comments count", comments.length);

  return comments.map((comment) => {
    if (!comment.author) {
      throw new Error("No `author` found in a comment!");
    }
    if (!comment.text) {
      throw new Error("No `text` found in a comment!");
    }
    if (!comment.created) {
      throw new Error("No `created` found in a comment!");
    }

    return {
      body: comment.text,
      author: serializeUser(comment.author),
      created: new Date(comment.created),
      id: "38977",
      // @todo [ajile]: Add attachments?
    };
  });
};

// @todo [ajile]: https://support.atlassian.com/jira-cloud-administration/docs/import-data-from-json/
// "body": "This private comment",
//                             "author": "557057:1a8aeee5-40e9-413a-9f4e-2f074f09644a",
//                             "created": "2012-08-31T17:59:02.161+0100",
//                             "updated": "2012-08-31T17:59:02.161+0100",
//                             "properties
