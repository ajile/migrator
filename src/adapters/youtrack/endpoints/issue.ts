import { IssueEndpoint as IssueEndpointBase } from "youtrack-rest-client";
import { PaginationOptions } from "youtrack-rest-client/dist/options/pagination_options";

const userFields = ["email", "fullName", "login", "name", "id"];

const projectFields = ["id", "name", "shortName", "description", "archived"];

const customFields = [
  "id",
  // eslint-disable-next-line max-len
  "projectCustomField(canBeEmpty,emptyFieldText,field(aliases,fieldDefaults(canBeEmpty,emptyFieldText,isPublic,id),hasRunningJob,isAutoAttached,isDisplayedInIssueList,isUpdateable,localizedName,name,ordinal,id),hasRunningJob,isPublic,ordinal,id)",
  // eslint-disable-next-line max-len
  "value(id,name,localizedName,fullName,login,avatarUrl,isResolved,color(id,background,foreground),text,minutes,presentation)",
  "$type",
  "name",
];

const tagFields = [`name`, `id`, `untagOnResolve`, `owner(${userFields})`];

const issueFields = [
  `id`,
  `numberInProject`,
  `created`,
  `updated`,
  `resolved`,
  `project(id,name,shortName,description,archived)`,
  `summary`,
  `description`,
];

const linkFields = [
  `id`,
  `direction`,
  `linkType(id,name,sourceToTarget,targetToSource,directed,aggregation,readOnly)`,
  `issue(${issueFields})`,
  `issues(${issueFields})`,
];

const commentFields = [
  `author(${userFields})`,
  `deleted`,
  `issue(${issueFields})`,
  `attachments`,
  `created`,
  `id`,
  `text`,
  `textPreview`,
  `updated`,
  `usesMarkdown`,
  `visibility`,
];

const attachmentFields = [
  `author(${userFields})`,
  `url`,
  `charset`,
  `created`,
  `fileName`,
  `name`,
  `id`,
  `mimeType`,
  `updated`,
  `updatedBy`,
  `visibleToGroups`,
  `visibleToUsers`,
];

const baseFields = [
  "id",
  "numberInProject",
  "created",
  "updated",
  "resolved",
  "summary",
  "description",
  "usesMarkdown",
  "isDraft",
];

const fields = [
  ...baseFields,
  `attachments(${attachmentFields})`,
  `comments(${commentFields})`,
  `fields(${customFields})`,
  `links(${linkFields})`,
  `project(${projectFields})`,
  `reporter(${userFields})`,
  `tags(${tagFields})`,
  `updater(${userFields})`,
];

export class IssueEndpoint extends IssueEndpointBase {
  async byId(issueId: string) {
    return this.client.get(`issues/${issueId}`, { params: { fields: fields.join(",") } });
  }

  async *allByProjectName(
    projectName: string,
    { skip = 0, partition = 100 }: { skip?: number; partition?: number } = {}
  ) {
    yield* this.allSearch(`project: {${projectName}}`, { skip, partition });
  }

  async *allSearch(query: string, { skip = 0, partition = 100 }: { skip?: number; partition?: number } = {}) {
    const _this = this;
    let hasResult = true;

    while (hasResult) {
      const res = await _this.search(query, { $skip: skip, $top: partition });
      yield* res;
      hasResult = res.length > 0;
      skip += partition;
    }
  }

  async count(query: string): Promise<number | undefined> {
    const params = { fields: "count", $top: -1 };
    const data = { query, unresolvedOnly: false, folder: null };

    let maxAttempts = 5;
    let count;

    // В документации REST API YouTrack написано, что значение -1 означает, что количество еще
    // не посчитано. На практике получается, что если делать регулярные запросы, то в какой-то
    // момент веренется значение отличное от -1. Аналогичным образом запросы делаются на сайте
    // самого YouTrack.
    while (count === undefined && maxAttempts > 0) {
      const result = await this.client.post(`issuesGetter/count`, { params, data });
      count = result.count === -1 ? undefined : result.count;
      maxAttempts--;
    }

    return count;
  }

  async search(query: string, paginationOptions?: PaginationOptions) {
    return this.client.get(`issues`, { params: { fields: fields.join(","), query, ...paginationOptions } });
  }
}
