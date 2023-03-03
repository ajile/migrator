import createLogger from "debug";
import { JiraExportLink } from "../types";
import { StraightenedLink } from "./normalizeIssueLinks";

const log = createLogger("migrator:converter:utils:deduplicateLinksAndMore");

export const deduplicateLinksAndMore = (links: StraightenedLink[]): (JiraExportLink | any)[] => {
  const hashes: Set<string> = new Set();
  const deduplicatedLinks = links.reduce<StraightenedLink[]>((array, link) => {
    const hash = [link.leftIssueKey, link.rightIssueKey, link.relation].sort().join(",");
    log(hash, hashes.has(hash));

    if (!hashes.has(hash)) {
      array.push(link);
    }

    hashes.add(hash);

    return array;
  }, []);

  return deduplicatedLinks.map((link) => {
    // log(link);
    return {
      name: link.relation,
      sourceId: link.leftIssueKey,
      destinationId: link.rightIssueKey,
    };
  });
};
