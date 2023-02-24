import createLogger from "debug";
import { ReducedUser } from "youtrack-rest-client";

const log = createLogger("migrator:converter:fields:serializeUser");

export const serializeUser = (youtrackUser: ReducedUser) => {
  // Сгенерируйте мапу
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const userMap = { ...require("../dicts/users.json"), ...require("../dicts/users-well-known.json") };
  const jiraUserId = userMap[youtrackUser.id];

  log("Invoke for YouTrack user ID", youtrackUser.id);

  return jiraUserId;
};
