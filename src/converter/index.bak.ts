import JiraApi from "jira-client";
import { Issue } from "youtrack-rest-client";
import { JiraFieldName } from "./dicts/jira/fields";
import { serializeAssignee } from "./serializers/serializeAssignee";
import { serializeComponent } from "./serializers/serializeComponent";
import { serializeIssueAttachments } from "./serializers/serializeIssueAttachments";
import { serializeIssueComments } from "./serializers/serializeIssueComments";
import { serializeIssueTester } from "./serializers/serializeIssueTester";
import { serializeIssueType } from "./serializers/serializeIssueType";
import { serializeLabels } from "./serializers/serializeLabels";
import { serializePriority } from "./serializers/serializeIssuePriority";
import { serializeUser } from "./serializers/serializeUser";

/**
 * Преобразовывает задачу YouTrack в задачу Jira.
 *
 * @param youtrackIssue Объект с данными по задаче YouTrack
 * @returns
 */
export const convertYouTrackIssueToJiraIssue = (youtrackIssue: Issue) => {
  const data: JiraApi.IssueObject = {
    key: `MERCHANT-${youtrackIssue.numberInProject}`,
  };

  const tester = serializeIssueTester(youtrackIssue) ? { id: serializeIssueTester(youtrackIssue) } : undefined;
  const assignee = serializeAssignee(youtrackIssue) ? { id: serializeAssignee(youtrackIssue) } : undefined;
  const components = serializeComponent(youtrackIssue) ? [{ id: serializeComponent(youtrackIssue) }] : undefined;
  const issuetype = { id: serializeIssueType(youtrackIssue) };
  const priority = serializePriority(youtrackIssue) ? { id: serializePriority(youtrackIssue) } : undefined;

  const fields: Partial<Record<JiraFieldName, unknown>> = {
    [JiraFieldName.ASSIGNEE]: assignee,
    [JiraFieldName.COMPONENTS]: components,
    [JiraFieldName.DESCRIPTION]: youtrackIssue.description,
    [JiraFieldName.ISSUETYPE]: issuetype,
    [JiraFieldName.LABELS]: serializeLabels(youtrackIssue),
    [JiraFieldName.PRIORITY]: priority,
    [JiraFieldName.PROJECT]: { key: "MERCHANT" },
    [JiraFieldName.SUMMARY]: youtrackIssue.summary,
    [JiraFieldName.TESTER]: tester,
    [JiraFieldName.REPORTER]: youtrackIssue.reporter && { id: serializeUser(youtrackIssue.reporter) },

    // [JiraFieldName.RESOLUTION_DATE]: youtrackIssue.resolved ? new Date(youtrackIssue.resolved) : undefined,
    // [JiraFieldName.ISSUELINKS]: ???

    // @error: Field 'reporter' cannot be set. It is not on the appropriate screen, or unknown.
    // @todo: Это проблемные поля, выяснить почему.
    // [JiraFieldName.CREATED]: youtrackIssue.created && new Date(youtrackIssue.created),
    // [JiraFieldName.CREATOR]: youtrackIssue.reporter && { id: serializeUser(youtrackIssue.reporter) },
    // [JiraFieldName.STATUS]: { id: serializeIssueStatus(youtrackIssue) },
    // [JiraFieldName.TIMETRACKING]: serializeTimetracking(youtrackIssue),
    // [JiraFieldName.UPDATED]: youtrackIssue.updated && new Date(youtrackIssue.updated),

    // @todo [ajile]: Figure out format in YouTrack and Jira
    // @error: Field 'comment' cannot be set. It is not on the appropriate screen, or unknown.
    // [JiraFieldName.TEST_BENCH_URL]: ???
    // [JiraFieldName.MAIN_BRANCH_NAME]: ???
    // [JiraFieldName.FIX_VERSIONS]: ???
    // [JiraFieldName.COMMENT]: { comments: youtrackIssue.comments },
  };

  data.fields = fields;

  return {
    issue: data,
    comments: serializeIssueComments(youtrackIssue.comments || []),
    attachments: serializeIssueAttachments(youtrackIssue.attachments || []),
  };
};

// @todo [ajile]: В задаче YT хранится релизная версия и Fix versions, можно релизы тоже перенести в Jira
// @todo [ajile]: Учитывать On Production при определении статуса задачи для фронтов
// @todo [ajile]: Import “links”
