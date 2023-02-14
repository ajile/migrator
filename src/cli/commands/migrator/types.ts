import { JiraMiddlewareYargsArguments, YouTrackMiddlewareYargsArguments } from "../../enhancers";
import { YargsArguments } from "../../types";

export type YargsArgumentsMigrator = YargsArguments & JiraMiddlewareYargsArguments & YouTrackMiddlewareYargsArguments;
