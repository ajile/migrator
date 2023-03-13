import createLogger from "debug";
import { IssueAttachment } from "youtrack-rest-client";
import { serializeUser } from "../utils/serializeUser";

const log = createLogger("migrator:converter:utils:serializeIssueAttachments");

export const serializeIssueAttachments = (attachments: IssueAttachment[] = []) => {
  log("Attachments count", attachments.length);

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
