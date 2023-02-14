//@ts-nocheck
import { ArgumentsCamelCase } from "yargs";
import { YargsArgumentsJira } from "./types";

export const command = "my-permissions";

export const describe = "Get my permission list";

const permissions = [
  "ADD_COMMENTS",
  "ADMINISTER",
  "ADMINISTER_PROJECTS",
  "ARCHIVE_DISCOVERY_ISSUES",
  "ASSIGNABLE_USER",
  "ASSIGN_ISSUES",
  "BROWSE_PROJECTS",
  "BULK_CHANGE",
  "CLOSE_ISSUES",
  "CREATE_ATTACHMENTS",
  "CREATE_DISCOVERY_INSIGHTS",
  "CREATE_DISCOVERY_VIEW_COMMENTS",
  "CREATE_ISSUES",
  "CREATE_PROJECT",
  "CREATE_SHARED_OBJECTS",
  "DELETE_ALL_ATTACHMENTS",
  "DELETE_ALL_COMMENTS",
  "DELETE_ALL_WORKLOGS",
  "DELETE_ISSUES",
  "DELETE_OWN_ATTACHMENTS",
  "DELETE_OWN_COMMENTS",
  "DELETE_OWN_WORKLOGS",
  "DISCOVERY_VOTE",
  "EDIT_ALL_COMMENTS",
  "EDIT_ALL_WORKLOGS",
  "EDIT_ISSUES",
  "EDIT_OWN_COMMENTS",
  "EDIT_OWN_WORKLOGS",
  "LINK_ISSUES",
  "MANAGE_DISCOVERY_DELIVERY",
  "MANAGE_DISCOVERY_IDEA_TEMPLATES",
  "MANAGE_DISCOVERY_INSIGHTS",
  "MANAGE_DISCOVERY_VIEWS",
  "MANAGE_DISCOVERY_VIEW_COMMENTS",
  "MANAGE_DISCOVERY_VIEW_FIELDS",
  "MANAGE_GROUP_FILTER_SUBSCRIPTIONS",
  "MANAGE_SPRINTS_PERMISSION",
  "MANAGE_WATCHERS",
  "MERGE_DISCOVERY_ISSUES",
  "MODIFY_DISCOVERY_VIEWS",
  "MODIFY_REPORTER",
  "MOVE_ISSUES",
  "PIN_DISCOVERY_ISSUE_VIEW_FIELDS",
  "RESOLVE_ISSUES",
  "SCHEDULE_ISSUES",
  "SERVICEDESK_AGENT",
  "SET_ISSUE_SECURITY",
  "SHARE_DISCOVERY_VIEWS",
  "SYSTEM_ADMIN",
  "TRANSITION_ISSUES",
  "USER_PICKER",
  "VIEW_AGGREGATED_DATA",
  "VIEW_DEV_TOOLS",
  "VIEW_READONLY_WORKFLOW",
  "VIEW_VOTERS_AND_WATCHERS",
  "WORK_ON_ISSUES",
  "okrplugin_prod__access-to-oboard-plugin",
];

export const handler = async function (argv: ArgumentsCamelCase<YargsArgumentsJira>): Promise<void> {
  const result = await argv.jira.doRequest(
    argv.jira.makeRequestHeader(
      argv.jira.makeUri({
        pathname: `/mypermissions`,
        query: { permissions: permissions.join(",") },
      })
    )
  );
  process.stdout.write(JSON.stringify(result));
};
