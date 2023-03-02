import createLogger from "debug";
import { IssueAttachment } from "youtrack-rest-client";
import { serializeUser } from "../utils/serializeUser";

const log = createLogger("migrator:converter:fields:serializeIssueAttachments");

export const serializeIssueAttachments = (attachments: IssueAttachment[] = []) => {
  log("Attachments count", attachments.length);

  // @todo [ajile]: There is no user 26-748. Attempting to create attachment with no user.
  return attachments.map((attachment) => {
    const userId: string = serializeUser(attachment.author);

    // if (!userId) {
    //   throw new Error("No Jira user ID for attachment found!");
    // }

    return {
      name: attachment.name,
      attacher: userId,
      created: new Date(attachment.created),
      uri: `https://${process.env.YOUTRACK_API_HOST}${attachment.url}`,
    };
  });
};
