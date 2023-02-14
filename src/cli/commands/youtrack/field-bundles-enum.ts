import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "field-bundles-enum <bundle-id>";

export const describe = "Get field bundles enum list";

const fields = [
  "$type",
  "archived",
  "assembleDate",
  "avatarUrl",
  "color(id)",
  "description",
  "fullName",
  "hasRunningJob",
  "id",
  "isResolved",
  "issueRelatedGroup(icon)",
  "localizedName",
  "login",
  "name",
  "ordinal",
  "owner(id,login,ringId)",
  "releaseDate",
  "released",
  "ringId",
  "showLocalizedNameInAdmin",
  "teamForProject(ringId)",
  "usersCount",
];

export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack & { bundleId: string }>
): Promise<void> {
  let results = await argv.youtrack.get(
    `admin/customFieldSettings/bundles/enum/${argv.bundleId}/values`,
    { params: { fields: fields.join(","), includeArchived: false } }
  );

  process.stdout.write(JSON.stringify(results));
};
