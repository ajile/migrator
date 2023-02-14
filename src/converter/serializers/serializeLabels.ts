import { Issue } from "youtrack-rest-client";
import { YouTrackFieldName } from "../dicts/youtrack/fields";
import { YoutrackSubsystem } from "../dicts/youtrack/subsystem";
import { getFieldValue } from "./getFieldValue";

export const serializeLabels = (youtrackIssue: Issue) => {
  const labels = youtrackIssue.tags?.map((tag) => tag.name) || [];
  const subsystem = getFieldValue(youtrackIssue.fields || [], YouTrackFieldName.SUBSYSTEM);

  if (subsystem === YoutrackSubsystem.ADMIN) {
    labels.push("Admin");
  }

  return labels?.map((tag) => tag.replace(/\s/g, "-").toLowerCase());
};
