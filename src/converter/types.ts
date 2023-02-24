import { JiraComponentName } from "./dicts/jira/component";
import { JiraIssueTypeName } from "./dicts/jira/issue-type";
import { JiraIssueLinkTypeName } from "./dicts/jira/link";
import { JiraIssuePriorityName } from "./dicts/jira/priority";
import { JiraIssueStatusName } from "./dicts/jira/status";

type JiraExportIssueId = string;
type JiraExportIssueUser = string;
type JiraExportIssueUserEmail = string;
type JiraExportIssueResolution = string;
type JiraExportIssueDateString = string;
type JiraExportIssueVersion = string;

export interface JiraExportIssueHistoryRecordItem {
  /**
   * @example jira
   */
  fieldType: string;
  /**
   * @example status
   */
  field: string;
  /**
   * @example 1
   */
  from: string;
  /**
   * @example Open
   */
  fromString: string;
  /**
   * @example 5
   */
  to: string;
  /**
   * @example Resolved
   */
  toString: string;
}

export interface JiraExportIssueHistoryRecord {
  author: JiraExportIssueUser;
  created: JiraExportIssueDateString;
  items: JiraExportIssueHistoryRecordItem[];
}

export interface JiraExportIssueAttachment {
  name: string;
  attacher: JiraExportIssueUserEmail;
  created: Date;
  uri: string;
  description?: string;
}

export interface JiraExportIssueCustomFieldValueBase {
  /**
   * @example Story Points
   */
  fieldName: string;
  /**
   * @example com.atlassian.jira.plugin.system.customfieldtypes:float
   */
  fieldType: string;
  /**
   * @example 15
   */
  value: any;
}

export interface JiraExportIssueCustomFieldValueTester {
  fieldName: "Tester";
  fieldType: "com.atlassian.jira.plugin.system.customfieldtypes:userpicker";
  value: JiraExportIssueUser;
}
export interface JiraExportIssueCustomFieldValueEpicName {
  fieldName: "Epic Name";
  fieldType: "com.pyxis.greenhopper.jira:gh-epic-label";
  value: string;
}

export type JiraExportIssueCustomFieldValue =
  | JiraExportIssueCustomFieldValueBase
  | JiraExportIssueCustomFieldValueTester
  | JiraExportIssueCustomFieldValueEpicName;

export interface JiraExportIssueComment {
  /**
   * @example This is a comment from admin 5 days ago
   */
  body: string;
  /**
   * @example abcde-12345-fedcba
   */
  author: string;
  /**
   * @example 2012-08-31T17:59:02.161+010
   */
  created: Date;
}

export interface JiraExportIssue {
  key: string;
  summary: string;
  description?: string;
  /**
   * Уникальный ключ во внешней системе (напр. YouTrack). Именно по этому ключу
   * при повторном экспорте Jira определяет задачу, которую нужно требуется
   * модифицировать.
   */
  externalId?: JiraExportIssueId;
  created: Date;

  issueType: JiraIssueTypeName;
  priority: JiraIssuePriorityName;
  status: JiraIssueStatusName;

  labels?: string[];
  components: JiraComponentName[];

  assignee?: JiraExportIssueUser;
  reporter: JiraExportIssueUser;

  comments?: JiraExportIssueComment[];
  attachments?: JiraExportIssueAttachment[];

  customFieldValues?: JiraExportIssueCustomFieldValue[];

  /**
   * В формате ISO-8601 (duration)
   */
  originalEstimate?: string;

  // @todo [ajile]: Список полей ниже требуется разобрать…
  watchers?: JiraExportIssueUser[];
  affectedVersions?: JiraExportIssueVersion[];
  fixedVersions?: JiraExportIssueVersion[];
  history?: JiraExportIssueHistoryRecord[];

  // @todo [ajile]: ?
  // resolution?: JiraExportIssueResolution;
  // updated: "P-1D";
}

export interface JiraExportLink {
  name: JiraIssueLinkTypeName;
  sourceId: string;
  destinationId: string;
}
