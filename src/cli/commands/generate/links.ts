import cliProgress from "cli-progress";
import { ArgumentsCamelCase } from "yargs";
import { Issue } from "youtrack-rest-client";
import { getJiraExportLinksJson } from "../../../converter";
import { YargsArgumentsMigrator } from "./types";

export const command = "links";

export const describe = "Generates JSON to export YouTrack links to Jira";

const PROJECT_KEY = "MT";

// const QUERY = `issue id: MERCHANT-8253`;
const QUERY = `tag: {Merchant Accounts}`;
// const QUERY = `project: {Merchant Services}`;
// const QUERY = `issue id: MERCHANT-8936 issue id: MERCHANT-9023 issue id: MERCHANT-9074`;

type Argv = ArgumentsCamelCase<YargsArgumentsMigrator>;

export const handler = async function (argv: Argv): Promise<void> {
  const startAt = 0;
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  // Получаем общее количество тасок на обработку
  const count = await argv.youtrack.issues.count(QUERY);

  // Стартуем прогресс бар (count — общее количество, 0 — текущее значение)
  bar.start(count, startAt);

  // @todo [ajile]: Remove
  // bar.stop();

  // Получаем асинхронный генератор возвращающий задачи
  const issues = await argv.youtrack.issues.allSearch(QUERY, { skip: startAt, partition: 1500 });

  const gen = async function* () {
    for await (const issue of issues) {
      bar.increment();
      yield issue;
    }
  };

  const json = await getJiraExportLinksJson(gen() as AsyncGenerator<Issue>, { projectKey: PROJECT_KEY });

  // Завершаем прогресс бар
  bar.stop();

  console.log(JSON.stringify(json));
};
