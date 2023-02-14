import createLogger from "debug";
import { IssueAttachment } from "youtrack-rest-client";
import { serializeUser } from "./serializeUser";

const log = createLogger("migrator:converter:fields:serializeIssueAttachments");

export const serializeIssueAttachments = (attachments: IssueAttachment[] = []) => {
  log("Attachments count", attachments.length);

  return attachments.map((attachment) => ({
    name: attachment.name,
    attacher: serializeUser(attachment.author),
    created: new Date(attachment.created),
    uri: `https://${process.env.YOUTRACK_API_HOST}${attachment.url}`,
  }));
};
