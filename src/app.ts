import express from "express";
import type { Request, Response } from "express";
import { groupsRouter } from "./routes/groupsRouter.js";
import { matchesRouter } from "./routes/matchesRouter.js";
import { teamsRouter } from "./routes/teamsRouter.js";

export const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Base route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "FIFA 2026 World Cup API" });
});

// Routers
app.use("/groups", groupsRouter);
app.use("/matches", matchesRouter);
app.use("/teams", teamsRouter);
