import createLogger from "debug";
import { Issue } from "youtrack-rest-client";
import { JiraExportIssue } from "../types";
import { StraightenedLink } from "./normalizeIssueLinks";
import { serializeAssignee } from "./serializeAssignee";
import { serializeComponent } from "./serializeComponent";
import { serializeIssueAttachments } from "./serializeIssueAttachments";
import { serializeIssueComments } from "./serializeIssueComments";
import { serializeIssueCustomFieldValues } from "./serializeIssueCustomFieldValues";
import { serializeIssueDescription } from "./serializeIssueDescription";
import { serializeIssueEstimation } from "./serializeIssueEstimation";
import { serializeIssuePriority } from "./serializeIssuePriority";
import { serializeIssueStatus } from "./serializeIssueStatus";
import { serializeIssueType } from "./serializeIssueType";
import { serializeLabels } from "./serializeLabels";
import { serializeReporter } from "./serializeReporter";

const log = createLogger("migrator:converter:utils:convertIssue");

type Options = {
  projectKey: string;
  links: StraightenedLink[];
};

/**
 * Преобразовывает задачу YouTrack в задачу Jira.
 *
 * @param youtrackIssue Объект с данными по задаче YouTrack
 * @returns
 */
export const convertIssue = (youtrackIssue: Issue, { projectKey, links }: Options) => {
  const key = `${projectKey}-${youtrackIssue.numberInProject}`;

  log(`Converting issue with ID`, key);

  const data: JiraExportIssue = {
    key: key,
    externalId: key,
    summary: youtrackIssue.summary!,
    description: serializeIssueDescription(youtrackIssue.description),
    created: new Date(youtrackIssue.created!),

    issueType: serializeIssueType(youtrackIssue.fields),
    priority: serializeIssuePriority(youtrackIssue.fields),
    status: serializeIssueStatus(youtrackIssue.fields),

    labels: serializeLabels(youtrackIssue),
    components: serializeComponent(youtrackIssue.fields),

    assignee: serializeAssignee(youtrackIssue.fields),
    reporter: serializeReporter(youtrackIssue),

    /**
     * @todo [ajile]: С комментариями в задачах есть проблемы:
     *                  1. При повторном импортировании комментарии повторно добавляются к задаче
     *                     из-за чего дублируются;
     *                  2. В комментариях могут содержаться файлы — их прикрепить к комментарию
     *                     при экспорте невозможно формат импортирования этого не предусматривает.
     */
    comments: serializeIssueComments(youtrackIssue.comments),

    /**
     * @todo [ajile]: С приложениями в задачах есть проблемы: При повторном импортировании файлы
     *                повторно добавляются к задаче из-за чего дублируются
     */
    attachments: serializeIssueAttachments(youtrackIssue.attachments),

    customFieldValues: serializeIssueCustomFieldValues(youtrackIssue, { links, projectKey }),
    originalEstimate: serializeIssueEstimation(youtrackIssue.fields),
  };

  return data;
};
