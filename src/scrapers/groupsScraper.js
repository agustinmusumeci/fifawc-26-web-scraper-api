import Scraper from "./scraper.js";

export default class GroupsScraper extends Scraper {
  async extract({ groupsNames = [] }) {
    const selector = this.getSelector();

    const groups = await this.evaluate(
      (selector, groupsNames) => {
        const tables = document.querySelectorAll(selector);

        const groups = [];

        tables.forEach((table) => {
          const groupName = table.querySelector(".standings-table-head_text__NDynK")?.innerText.trim() ?? "Unknown Group";

          const rows = Array.from(table.querySelectorAll("tbody tr"));

          if (!groupsNames.includes(groupName) && groupsNames.length > 0) return;

          const teams = rows.map((row) => {
            const cells = row.querySelectorAll("td");

            const position = Number(cells[1].innerText.trim());

            const teamName = row.querySelector(".table-team-name_teamName__lgiBj > span")?.innerText.trim() ?? row.querySelector(".table-team-name_teamName__lgiBj span")?.innerText.trim() ?? null;

            const shortTeamName =
              row.querySelector(".table-team-name_teamName__lgiBj > span:nth-child(2)")?.innerText.trim() ?? row.querySelector(".table-team-name_teamName__lgiBj span")?.innerText.trim() ?? null;
            const flag = row.querySelector(".image_img__pNjkh")?.getAttribute("src") ?? "No flag";
            const played = Number(cells[3].innerText.trim());
            const wins = Number(cells[4].innerText.trim());
            const draws = Number(cells[5].innerText.trim());
            const losses = Number(cells[6].innerText.trim());
            const gf = Number(cells[7].innerText.trim());
            const ga = Number(cells[8].innerText.trim());
            const gd = Number(cells[9].innerText.trim());
            const points = Number(cells[10].innerText.trim());

            const form = Array.from(row.querySelectorAll(".table-col-form_teamForm__G0F0k div")).map((el) => el.innerText.trim());

            return {
              position,
              team: teamName,
              shortTeamName: shortTeamName,
              flag: flag,
              played,
              wins,
              draws,
              losses,
              gf,
              ga,
              gd,
              points,
              form,
            };
          });

          groups.push({
            group: groupName,
            teams,
          });
        });

        return groups;
      },
      selector,
      groupsNames,
    );

    return groups;
  }
}
