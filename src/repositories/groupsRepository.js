import GroupsScraper from "../scrapers/groupsScraper.js";

class GroupsRepository {
  async getGroups() {
    const scraper = new GroupsScraper();

    const groups = await scraper.scrape("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings", ".standings-table_standingsTableContainer__zCpm2");

    return groups;
  }
}

export default new GroupsRepository();
