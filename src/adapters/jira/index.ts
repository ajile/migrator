import JiraApiBase from "jira-client";

export class JiraApi extends JiraApiBase {
  async *allSearch(searchString: string, { startAt = 0, maxResults = 50, ...optional }: JiraApiBase.SearchQuery = {}) {
    let hasResult = true;

    while (hasResult) {
      const res = await this.searchJira(searchString, { ...optional, maxResults, startAt });
      yield* res.issues;
      hasResult = res.issues.length > 0;
      startAt += maxResults;
    }
  }
}
