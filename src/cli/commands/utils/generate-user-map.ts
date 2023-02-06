import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsUtils } from "./types";

export const command = "generate-user-map";

export const describe = "Generates mapping YouTrack Users → Jira Users";

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsUtils>
): Promise<void> {
  const [jiraUsers, youTrackUsers] = await Promise.all([
    argv.jira.getUsers(0, 10000),
    argv.youtrack.users.all({ $top: 100000 }),
  ]);

  const jiraUsersByEmail = new Map(
    jiraUsers.map((user) => [user.emailAddress, user])
  );

  const jiraUsersByDisplayName = new Map(
    jiraUsers.map((user) => [user.displayName, user])
  );

  const result = youTrackUsers.reduce((acc, user) => {
    const jiraUser =
      jiraUsersByEmail.get(user.email || undefined) ||
      jiraUsersByDisplayName.get(user.login);

    if (!jiraUser) return acc;

    return { ...acc, [user.id]: jiraUser.accountId };
  }, {});

  console.log(JSON.stringify(result));
};
