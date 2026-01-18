import { Router } from "express";
import teamsController from "../controllers/teamsController.js";

export const teamsRouter = Router();

teamsRouter.get("/", async (req, res) => {
  try {
    const teams = await teamsController.getTeams();

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: teams, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
