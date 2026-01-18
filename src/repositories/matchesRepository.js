import puppeteer from "puppeteer";

class MatchesRepository {
  async getMatches() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?wtw-filter=ALL", { waitUntil: "networkidle0" });

    await page.waitForSelector(".match-row_matchRowContainer__NoCRI");

    const matches = await page.evaluate(() => {
      const days = document.querySelectorAll(".col-xl-12.col-lg-12.ff-pb-24");

      const matches = [];

      days.forEach((day) => {
        const date = day.querySelector(".matches-container_title__ATLsl")?.innerText.trim() ?? null;

        const dayMatches = day.querySelectorAll("a[href*='/match-centre/match']");

        dayMatches.forEach((match) => {
          const rawTeams = match.querySelectorAll(".match-row_team__y5Rva");
          const teams = [];

          rawTeams.forEach((team) => {
            const teamName = team.querySelector("span")?.innerText ?? "Unknow team";

            teams.push({ team: teamName });
          });

          const time = match.querySelector(".match-row_matchTime__9QJXJ")?.innerText ?? "00:00";
          const stage = match.querySelector(".match-row_bottomLabel__ni63b").innerText ?? "";
          const stadium = match.querySelector(".match-row_stadiumCityLabels__zjXUq > span")?.innerText ?? "";
          const link = "fifa.com" + match.getAttribute("href");

          matches.push({
            date: date,
            teams: teams,
            time: time,
            stage: stage,
            stadium: stadium,
            link: link,
          });
        });
      });

      return matches;
    });

    // Cierra el browser
    await browser.close();

    return matches;
  }
}

export default new MatchesRepository();
