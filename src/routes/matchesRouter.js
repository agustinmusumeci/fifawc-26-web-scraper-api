import { Router } from "express";
import matchesController from "../controllers/matchesController.js";

export const matchesRouter = Router();

matchesRouter.get("/", async (req, res) => {
  try {
    const matchesDates = req?.query?.dates?.split(",") ?? [];

    const matches = await matchesController.getMatches(matchesDates);

    return res.status(200).json({ message: "FIFA 2026 World Cup Matches", data: matches, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
