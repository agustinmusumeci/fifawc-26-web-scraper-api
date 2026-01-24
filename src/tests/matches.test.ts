import request from "supertest";
import { app } from "../app.js";

describe("Test the matches path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/matches");

    const expectedFormat = {
      message: expect.any(String),
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          teams: expect.arrayContaining([
            expect.objectContaining({
              team: expect.any(String),
            }),
          ]),
          time: expect.any(String),
          stage: expect.any(String),
          stadium: expect.any(String),
          link: expect.any(String),
        }),
      ]),
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(expectedFormat);
  }, 20000);
});
