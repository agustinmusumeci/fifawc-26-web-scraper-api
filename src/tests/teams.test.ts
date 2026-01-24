import request from "supertest";
import { app } from "../app.js";

describe("Test the teams path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/teams");

    const expectedFormat = {
      message: expect.any(String),
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          link: expect.any(String),
          flag: expect.any(String),
          isHost: expect.any(Boolean),
          group: expect.any(String),
          worldRanking: expect.any(String),
          appearances: expect.any(String),
        }),
      ]),
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(expectedFormat);
  }, 20000);
});
