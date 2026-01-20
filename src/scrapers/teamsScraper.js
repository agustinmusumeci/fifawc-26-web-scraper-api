import Scraper from "./scraper.js";

export default class TeamsScraper extends Scraper {
  async extract({ teamsNames = [] }) {
    const selector = this.getSelector();

    const teams = await this.evaluate(
      (selector, teamsNames) => {
        const rawTeams = document.querySelectorAll(selector);

        const teams = [];

        rawTeams.forEach((team) => {
          const link = "fifa.com" + team.querySelector("a")?.getAttribute("href") ?? null;

          const name = team.querySelector(".team-card_teamName__-2Ckj span.d-none.d-md-block")?.innerText ?? team.querySelector(".team-card_teamName__-2Ckj span")?.innerText ?? "Unknown team";

          if (!teamsNames.includes(name) && teamsNames.length > 0) return;

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
      },
      selector,
      teamsNames,
    );

    return teams;
  }
}
