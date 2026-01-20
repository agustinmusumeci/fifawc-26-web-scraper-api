// import puppeteer from "puppeteer";
import TeamsScraper from "../scrapers/teamsScraper.js";

class TeamRepository {
  async getTeams() {
    const scraper = new TeamsScraper();

    const teams = await scraper.scrape("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams", ".team-card_teamCard__b0aXG");

    return teams;
  }
}

export default new TeamRepository();
