import request from "supertest";
import { app } from "../app.js";

describe("Test the groups path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/groups");

    const expectedFormat = {
      message: expect.any(String),
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          group: expect.any(String),
          teams: expect.arrayContaining([
            expect.objectContaining({
              position: expect.any(Number),
              team: expect.any(String),
              shortTeamName: expect.any(String),
              flag: expect.any(String),
              played: expect.any(Number),
              wins: expect.any(Number),
              draws: expect.any(Number),
              losses: expect.any(Number),
              gf: expect.any(Number),
              ga: expect.any(Number),
              gd: expect.any(Number),
              points: expect.any(Number),
              form: expect.arrayContaining([expect.any(String)]),
            }),
          ]),
        }),
      ]),
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(expectedFormat);
  }, 20000);
});
