import puppeteer from "puppeteer";

class TeamRepository {
  async getTeams() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams", { waitUntil: "networkidle0" });

    await page.waitForSelector(".team-card_teamCard__b0aXG");

    const teams = await page.evaluate(() => {
      const rawTeams = document.querySelectorAll(".team-card_teamCard__b0aXG");

      const teams = [];

      rawTeams.forEach((team) => {
        const link = "fifa.com" + team.querySelector("a")?.getAttribute("href") ?? null;

        const name = team.querySelector(".team-card_teamName__-2Ckj span.d-none.d-md-block")?.innerText ?? team.querySelector(".team-card_teamName__-2Ckj span")?.innerText ?? "Unknown team";

        const flag = team.querySelector("img.team-card_teamFlag__XTFGY")?.getAttribute("src") ?? "No flag";

        const isHost = team.querySelector(".typography-label")?.innerText.toLowerCase().includes("host") ?? false;

        const rows = team.querySelectorAll(".team-card-body-row_cardBodyRow__y2PQ1");

        const group = rows[0]?.querySelector(".team-card-body-row_right__s9t1g")?.innerText.trim() ?? null;

        const worldRanking = rows[1]?.querySelector(".team-card-body-row_right__s9t1g")?.innerText.trim() ?? null;

        const appearances = rows[2]?.querySelector(".team-card-body-row_right__s9t1g")?.innerText.trim() ?? null;

        teams.push({
          name: name,
          link: link,
          flag: flag,
          isHost: isHost,
          group: group,
          worldRanking: worldRanking,
          appearances: appearances,
        });
      });

      return teams;
    });

    // Cierra el browser
    await browser.close();

    return teams;
  }
}

export default new TeamRepository();
