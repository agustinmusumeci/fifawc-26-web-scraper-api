import { Router } from "express";
import groupsController from "../controllers/groupsController.js";

export const groupsRouter = Router();

groupsRouter.get("/", async (req, res) => {
  try {
    const groups = await groupsController.getTeams();

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: groups, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
