import { Youtrack } from "youtrack-rest-client";
import { YargsArguments } from "../../types";

export type YargsArgumentsYouTrack = YargsArguments & {
  youtrack: Youtrack;
  "project-name": string;
};
