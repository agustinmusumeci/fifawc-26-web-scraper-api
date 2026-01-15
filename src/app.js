import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "FIFA 2026 World Cup API" });
});

app.get("/groups", async (req, res) => {
  // Inicia el browser
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings", { waitUntil: "networkidle0" });

    await page.waitForSelector(".standings-table_standingsTableContainer__zCpm2");

    // Ejecuta código JS en la consola del navegador
    const results = await page.evaluate(() => {
      const tables = document.querySelectorAll(".standings-table_standingsTableContainer__zCpm2");

      const groups = [];

      tables.forEach((table) => {
        const groupName = table.querySelector(".standings-table-head_text__NDynK")?.innerText.trim() ?? "Unknown Group";

        const rows = Array.from(table.querySelectorAll("tbody tr"));

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
    });

    // Cierra el browser
    await browser.close();

    return res.status(200).json({ message: "FIFA 2026 World Cup Groups", data: results });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!", error: error });
  }
});

app.get("/matches", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?wtw-filter=ALL", { waitUntil: "networkidle0" });

    await page.waitForSelector(".match-row_matchRowContainer__NoCRI");

    const results = await page.evaluate(() => {
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

    return res.status(200).json({ message: "FIFA 2026 World Cup Matches", data: results });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!", error: error });
  }
});

app.get("/teams", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams", { waitUntil: "networkidle0" });

    await page.waitForSelector(".team-card_teamCard__b0aXG");

    const results = await page.evaluate(() => {
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

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: results });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!", error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT} 🏆`);
});
