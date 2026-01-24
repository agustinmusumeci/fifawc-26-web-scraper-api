import { Router } from "express";
import groupsController from "../controllers/groupsController.js";
import type { Request, Response } from "express";
import type { Group } from "../types/groups.ts";

export const groupsRouter = Router();

groupsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const groupsNames: Array<string> =
      (typeof req?.query?.groups === "string"
        ? req.query.groups.split(",").map((group) => {
            return group.toLowerCase();
          })
        : []) ?? [];

    const groups: Array<Group> = await groupsController.getGroups(groupsNames);

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: groups, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", data: [], success: false });
  }
});
