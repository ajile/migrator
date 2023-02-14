import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsYouTrack } from "./types";

export const command = "issue <id>";

export const describe = "Get particular issue by id";

const fields = [
  "id",
  "numberInProject",
  "created",
  "updated",
  "resolved",
  "project(id,name,shortName,description,archived)",
  "summary",
  "description",
  "reporter(email,fullName,login,name,id)",
  "updater(email,fullName,login,name,id)",
  "usesMarkdown",
  // eslint-disable-next-line max-len
  "fields(id,projectCustomField(canBeEmpty,emptyFieldText,field(aliases,fieldDefaults(canBeEmpty,emptyFieldText,isPublic,id),hasRunningJob,isAutoAttached,isDisplayedInIssueList,isUpdateable,localizedName,name,ordinal,id),hasRunningJob,isPublic,ordinal,id),value(id,name,localizedName,fullName,login,avatarUrl,isResolved,color(id,background,foreground),text,minutes,presentation),$type,name)",
  "isDraft",
  "tags(name,id,untagOnResolve,owner(email,fullName,login,name,id))",
  // eslint-disable-next-line max-len
  "links(id,direction,linkType(id,name,sourceToTarget,targetToSource,directed,aggregation,readOnly),issue(id,numberInProject,created,updated,resolved,project(id,name,shortName,description,archived),summary,description),issues(id,numberInProject,created,updated,resolved,project(id,name,shortName,description,archived),summary,description))",
  // eslint-disable-next-line max-len
  "comments(author(email,fullName,login,name,id),deleted,issue(id,numberInProject,created,updated,resolved,project(id,name,shortName,description,archived),summary,description),attachments,created,id,text,textPreview,updated,usesMarkdown,visibility)",
  // eslint-disable-next-line max-len
  "attachments(author(email,fullName,login,name,id),url,charset,created,fileName,name,id,mimeType,updated,updatedBy,visibleToGroups,visibleToUsers)",
];

// console.log(fields);
export const handler = async function (
  argv: ArgumentsCamelCase<YargsArgumentsYouTrack & { id: string }>
): Promise<void> {
  const issue = await argv.youtrack.issues.byId(argv.id);
  // const issue = await argv.youtrack.get(`issues/${argv.id}`, {
  //   params: {
  //     fields: fields.join(","),
  //   },
  // });
  process.stdout.write(JSON.stringify(issue));
};
