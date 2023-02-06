import { Youtrack } from "youtrack-rest-client";

export const youtrackMiddleware = function (argv) {
  argv.youtrack = new Youtrack({
    baseUrl: `https://${argv.youtrackApiHost}`,
    token: argv.youtrackApiToken,
  });
};

export type YouTrackMiddlewareYargsArguments = { youtrack: Youtrack };
