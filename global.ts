import type YouTrack from "youtrack-rest-client";
import { ReducedUser } from "youtrack-rest-client";

export { YouTrack };

declare module "youtrack-rest-client" {
  interface IssueAttachment {
    name: string;
    updated: number;
    author: ReducedUser;
    created: number;
    url: string;
    mimeType: string;
    id: string;
    $type: string;
  }
  interface Issue {
    attachments?: IssueAttachment[];
  }
}
