import Scraper from "./scraper.js";

export default class MatchesScraper extends Scraper {
  async extract({ matchesDates = [] }) {
    const matches = await this.evaluate((matchesDates) => {
      const days = document.querySelectorAll(".col-xl-12.col-lg-12.ff-pb-24");

      const months = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };

      const matches = [];

      days.forEach((day) => {
        const utcDate = day.querySelector(".matches-container_title__ATLsl")?.innerText.trim() ?? null;
        const splitedUtcDate = utcDate?.split(" ") ?? null;

        if (!utcDate || utcDate.length < 4) return;

        const date = splitedUtcDate.at(1) + "/" + String(months[splitedUtcDate.at(2)]).padStart(2, "0") + "/" + splitedUtcDate.at(3);

        if (!matchesDates.includes(date) && matchesDates.length > 0) return;

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
            date: utcDate,
            teams: teams,
            time: time,
            stage: stage,
            stadium: stadium,
            link: link,
          });
        });
      });

      return matches;
    }, matchesDates);

    return matches;
  }
}
