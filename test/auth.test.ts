import request from "supertest";
import app from "../src/app";
import { connectDatabase } from "../src/database";
import User from "../src/models/User.model";
import { generateToken } from "../src/utils/jwt.util";

describe("Auth API", () => {
  beforeAll(async () => {
    // Connect to the test database before running tests
    await connectDatabase();
  });

  afterAll(async () => {
    // Clean up the database after tests
    await User.deleteMany({});
  });

  describe("POST /auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      // Create a test user
      const user = new User({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });
      await user.save();

      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "testuser", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it("should fail with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "testuser", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials.");
    });

    it("should fail when username is missing", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Username is required.");
    });

    it("should fail when password is missing", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "testuser" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password is required.");
    });
  });

  describe("GET /auth/me", () => {
    it("should get user details with a valid token", async () => {
      const user = new User({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });
      await user.save();

      const token = generateToken({ id: user._id });

      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user.username).toBe("testuser");
    });

    it("should fail without a token", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Access token is missing");
    });

    it("should fail with an invalid token", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalidtoken");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid token");
    });
  });
});
