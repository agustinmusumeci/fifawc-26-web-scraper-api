import Scraper from "./scraper.js";

export default class MatchesScraper extends Scraper {
  async extract({ matchesDates = [] }) {
    const matches = await this.evaluate(
      (selector, matchesDates) => {
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
      },
      selector,
      matchesDates,
    );

    return matches;
  }
}
