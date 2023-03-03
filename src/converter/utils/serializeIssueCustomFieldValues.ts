import { Issue } from "youtrack-rest-client";
import { jiraIssueEpicStatusByStatus } from "../dicts/mapping/issue-epic-status";
import { JiraExportIssueCustomFieldValue } from "../types";
import { StraightenedLink } from "./normalizeIssueLinks";
import { serializeIssueStatus } from "./serializeIssueStatus";
import { serializeIssueTester } from "./serializeIssueTester";
import { serializeIssueType } from "./serializeIssueType";

type Options = {
  links?: StraightenedLink[];
  projectKey: string;
};

export const serializeIssueCustomFieldValues = (youtrackIssue: Issue, { links = [], projectKey }: Options) => {
  const values: JiraExportIssueCustomFieldValue[] = [];
  const issueType = serializeIssueType(youtrackIssue.fields);
  const testerUserId = serializeIssueTester(youtrackIssue.fields);
  const status = serializeIssueStatus(youtrackIssue.fields);

  if (testerUserId) {
    values.push({
      fieldName: "Tester",
      fieldType: "com.atlassian.jira.plugin.system.customfieldtypes:userpicker",
      value: testerUserId,
    });
  }

  if (issueType === "Epic") {
    values.push({
      fieldName: "Epic Name",
      fieldType: "com.pyxis.greenhopper.jira:gh-epic-label",
      value: youtrackIssue.summary,
    });

    if (status) {
      values.push({
        fieldName: "Epic Status",
        fieldType: "com.pyxis.greenhopper.jira:gh-epic-status",
        value: jiraIssueEpicStatusByStatus[status],
      });
    }
  } else {
    const link = links.find(
      (link) =>
        link.leftIssueKey === `${projectKey}-${youtrackIssue.numberInProject}` &&
        link.epicRelation &&
        link.relation === "Consist"
    );

    if (link) {
      values.push({
        fieldName: "Epic Link",
        fieldType: "com.pyxis.greenhopper.jira:gh-epic-link",
        value: link.rightIssueKey,
      });
    }
  }

  return values;
};
