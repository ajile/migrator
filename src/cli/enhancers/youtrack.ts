// @ts-nocheck
import { Argv } from "yargs";
import { IssueEndpoint, Youtrack } from "youtrack-rest-client";

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

export const withYoutrack = (yargs: Argv) =>
  yargs
    .option("youtrack.api-host", {
      type: "string",
      default: process.env.YOUTRACK_API_HOST,
      describe: "API URL of your YouTrack",
    })
    .option("youtrack.api-token", {
      type: "string",
      default: process.env.YOUTRACK_TOKEN,
      describe: "The access token of the project in YouTrack",
    })
    .demandOption(["youtrack"], "Please provide all arguments to work with this tool")
    .coerce(
      ["youtrack"],
      ({ apiToken = process.env.YOUTRACK_TOKEN, apiHost = process.env.YOUTRACK_API_HOST }) =>
        new Proxy(
          new Youtrack({
            baseUrl: `https://${apiHost}`,
            token: apiToken!,
          }),
          {
            get(target, prop, receiverYT) {
              if (prop === "issues") {
                return new Proxy(Reflect.get(target, prop, receiverYT), {
                  get(target, prop, receiver) {
                    if (prop === "byId") {
                      // Метод byId переопределен для того, чтобы можно было используя стандартный
                      // интерфейс получать задачи с расширенным набором полей. Это решение не очень
                      // красивое и не очень очевидное, но для конечного пользователя удобнее. Если
                      // бы это была не утилита, а полноценный проект, то этот аспект нужно было бы
                      // как-то усилить.
                      return (issueId) => receiverYT.get(`issues/${issueId}`, { params: { fields: fields.join(",") } });
                    }
                    return Reflect.get(target, prop, receiver);
                  },
                });
              }

              return Reflect.get(target, prop, receiverYT);
            },
          }
        )
    );

export type YouTrackMiddlewareYargsArguments = { youtrack: Youtrack };
