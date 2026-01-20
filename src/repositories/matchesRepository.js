import MatchesScraper from "../scrapers/matchesScraper.js";

class MatchesRepository {
  async getMatches() {
    const scraper = new MatchesScraper();

    const matches = await scraper.scrape("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?wtw-filter=ALL", { waitUntil: "networkidle0" });

    // await page.waitForSelector(".match-row_matchRowContainer__NoCRI");

    return matches;
  }
}

export default new MatchesRepository();
