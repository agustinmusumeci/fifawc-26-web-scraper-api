import GroupsScraper from "../scrapers/groupsScraper.js";
import type { Group } from "../types/groups.js";

class GroupsRepository {
  async getGroups(groupsNames: Array<string>): Promise<Array<Group>> {
    const scraper = new GroupsScraper();

    const groups: any = await scraper.scrape("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings", ".standings-table_standingsTableContainer__zCpm2", {
      groupsNames: groupsNames,
    });

    return groups;
  }
}

export default new GroupsRepository();
