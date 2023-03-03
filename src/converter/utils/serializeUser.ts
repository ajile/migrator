import createLogger from "debug";
import { ReducedUser } from "youtrack-rest-client";
import wellKnownUsers from "../dicts/users-well-known";

const log = createLogger("migrator:converter:utils:serializeUser");

export const serializeUser = (youtrackUser: ReducedUser) => {
  // Сгенерируйте мапу
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const userMap = { ...require("../dicts/users.json"), ...wellKnownUsers };
  const jiraUserId = userMap[youtrackUser.id];

  log("Invoke for YouTrack user ID", youtrackUser.id);

  return jiraUserId;
};
