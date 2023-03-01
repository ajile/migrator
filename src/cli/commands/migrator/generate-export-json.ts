import cliProgress from "cli-progress";
import { ArgumentsCamelCase } from "yargs";
import { getJiraExportJson } from "../../../converter";
import { YargsArgumentsMigrator } from "./types";
// import issues from "../../../../examples/youtrack/issues.json";
import { Issue } from "youtrack-rest-client";

export const command = "generate-export-json";

export const describe = "Generates JSON to export YouTrack issues to Jira";

export const builder = {
  "with-comments": {
    type: "boolean",
  },
  "with-attachments": {
    type: "boolean",
  },
  "with-links": {
    type: "boolean",
  },
} as const;

// const QUERY = `project: {Merchant Services}`;

// Много связей
const QUERY = `issue id: MERCHANT-5215`;

// Эпик и ребенок
// const QUERY = `issue id: MERCHANT-9287 issue id: MERCHANT-9288`;

// Связанные между собой задачи
// const QUERY = `issue id: MERCHANT-9289 issue id: MERCHANT-9290`;

// const QUERY = `tag: EasyStrike`;

type Argv = ArgumentsCamelCase<YargsArgumentsMigrator>;
export const handler = async function (argv: Argv): Promise<void> {
  const startAt = 0;
  // const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  // Получаем общее количество тасок на обработку
  // const count = await argv.youtrack.issues.count(QUERY);

  // Стартуем прогресс бар (count — общее количество, 0 — текущее значение)
  // bar.start(count, startAt);

  // Получаем асинхронный генератор возвращающий задачи
  // const issues = await argv.youtrack.issues.allByProjectName(PROJECT_NAME, { skip: startAt, partition: 500 });
  const issues = await argv.youtrack.issues.allSearch(QUERY, { skip: startAt, partition: 500 });

  const gen = async function* () {
    for await (const issue of issues) {
      // bar.increment();
      yield issue;
    }
  };

  const json = await getJiraExportJson(gen() as AsyncGenerator<Issue>);

  // Завершаем прогресс бар
  // bar.stop();

  console.log(JSON.stringify(json));
};
