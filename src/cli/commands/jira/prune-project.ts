import cliProgress from "cli-progress";
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "prune-project";

export const describe = "Deletes all issue in project";

const QUERY = 'project = "MT"';
// const QUERY = 'project = "MT" and labels = merchant-accounts';
// const QUERY = 'project = "MT" and labels = rich-content';

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira & { id: string }>): Promise<void> {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  const { total } = await argv.jira.searchJira(QUERY, { maxResults: 1 });
  bar.start(total, 0);

  const issues = await argv.jira.allSearch(QUERY, { maxResults: 100 });

  for await (const issue of issues) {
    // На всякий случай
    if (!issue.key.startsWith("MT-")) {
      console.log(issue);
      throw new Error("The issue doesn’t start with MT!!!");
    }
    bar.increment();
    await argv.jira.deleteIssue(issue.key);
  }

  bar.stop();
};
