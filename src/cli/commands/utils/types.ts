import { JiraMiddlewareYargsArguments, YouTrackMiddlewareYargsArguments } from "../../middlewares";
import { YargsArguments } from "../../types";

export type YargsArgumentsUtils = YargsArguments & JiraMiddlewareYargsArguments & YouTrackMiddlewareYargsArguments;
