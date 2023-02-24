import { Youtrack as YoutrackBase } from "youtrack-rest-client";
import { IssueEndpoint } from "./endpoints/issue";

export class YouTrack extends YoutrackBase {
  public issues = new IssueEndpoint(this);
}
