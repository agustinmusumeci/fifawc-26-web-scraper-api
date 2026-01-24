import { Router } from "express";
import teamsController from "../controllers/teamsController.js";
import type { Request, Response } from "express";
import type { Team } from "../types/teams.ts";

export const teamsRouter = Router();

teamsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const teamsNames =
      (typeof req?.query?.names === "string"
        ? req?.query?.names?.split(",").map((name) => {
            return name.toLowerCase();
          })
        : []) ?? [];

    const teams: Array<Team> = await teamsController.getTeams(teamsNames);

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: teams, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
