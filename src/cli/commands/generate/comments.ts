import cliProgress from "cli-progress";
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsMigrator } from "./types";
// import issues from "../../../../examples/youtrack/issues.json";
import { Issue } from "youtrack-rest-client";
import { getJiraExportCommentsJson } from "../../../converter/utils/getJiraExportCommentsJson";

export const command = "comments";

export const describe = "Generates JSON to export YouTrack comments to Jira";

const PROJECT_KEY = "MT";

const QUERY = `project: {Merchant Services}`;
// const QUERY = `tag: {Merchant Accounts}`;

type Argv = ArgumentsCamelCase<YargsArgumentsMigrator>;

export const handler = async function (argv: Argv): Promise<void> {
  const startAt = 0;
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  // Получаем общее количество тасок на обработку
  const count = await argv.youtrack.issues.count(QUERY);

  // Стартуем прогресс бар (count — общее количество, 0 — текущее значение)
  bar.start(count, startAt);

  // Получаем асинхронный генератор возвращающий задачи
  const issues = await argv.youtrack.issues.allSearch(QUERY, { skip: startAt, partition: 1500 });

  const gen = async function* () {
    for await (const issue of issues) {
      bar.increment();
      yield issue;
    }
  };

  const json = await getJiraExportCommentsJson(gen() as AsyncGenerator<Issue>, { projectKey: PROJECT_KEY });

  // Завершаем прогресс бар
  bar.stop();

  console.log(JSON.stringify(json));
};
