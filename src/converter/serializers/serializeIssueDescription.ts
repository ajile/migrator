import createLogger from "debug";
import j2m from "jira2md";

const log = createLogger("migrator:converter:fields:serializeIssueDescription");

export const serializeIssueDescription = (description: string | undefined) => {
  log("Invoked");
  // return description && j2m.to_jira(description);
  return description;
};
