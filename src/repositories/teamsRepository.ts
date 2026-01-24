import TeamsScraper from "../scrapers/teamsScraper.js";
import type { Team } from "../types/teams.js";

class TeamRepository {
  async getTeams(teamsNames: Array<string>): Promise<Array<Team>> {
    const scraper = new TeamsScraper();

    const teams: any = await scraper.scrape("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams", ".team-card_teamCard__b0aXG", { teamsNames: teamsNames });

    return teams;
  }
}

export default new TeamRepository();
