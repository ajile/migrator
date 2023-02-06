import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "fields";

export const describe = "Get field list";

export const builder = {
  "project-name": {
    type: "string",
    alias: "p",
  },
};

const fields = [
  "id",
  "name",
  "localizedName",
  "fieldType",
  "isAutoAttached",
  "isDisplayedInIssueList",
  "ordinal",
  "aliases",
  "fieldDefaults",
  "hasRunningJob",
  "isUpdateable",
  "instances(project(name))",
];

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack & { id: string }>
): Promise<void> {
  let results = await argv.youtrack.get(
    "admin/customFieldSettings/customFields",
    { params: { fields: fields.join(",") } }
  );

  if (argv.projectName) {
    results = results.filter((item) =>
      item.instances.find(
        (instance) => instance.project.name === argv.projectName
      )
    );
  }

  process.stdout.write(JSON.stringify(results));
};
