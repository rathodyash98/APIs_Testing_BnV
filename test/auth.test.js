import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "testuser", password: "password123" });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
