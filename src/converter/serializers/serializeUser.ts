import { ReducedUser } from "youtrack-rest-client";

export const serializeUser = (youtrackUser: ReducedUser) => {
  // Сгенерируйте мапу
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const userMap = require("../dicts/users.json");
  const jiraUserId = userMap[youtrackUser.id];

  if (!jiraUserId) {
    throw new Error("No Jira user found!");
  }

  return jiraUserId;
};
