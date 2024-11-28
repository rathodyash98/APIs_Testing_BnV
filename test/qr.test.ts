import request from "supertest";
import app from "../app";
import { generateToken } from "../src/utils/jwt.util"; // Assuming you have a utility to generate tokens for testing

describe("QR Code API", () => {
  let validToken: string;

  beforeAll(() => {
    // Generate a valid token for authenticated tests
    validToken = generateToken({ id: "testuser123" });
  });

  describe("POST /qr/generate", () => {
    it("should generate a dynamic QR code", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .set("Authorization", `Bearer ${validToken}`)
        .send({ initialUrl: "https://example.com" });

      expect(response.status).toBe(201);
      expect(response.body.dynamicId).toBeDefined();
      expect(response.body.qrImage).toBeDefined(); // Ensure the QR code image is returned
    });

    it("should fail if no URL is provided", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .set("Authorization", `Bearer ${validToken}`)
        .send({}); // Send an empty body

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Initial URL is required.");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({ initialUrl: "https://example.com" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Access token is missing or invalid.");
    });
  });

  describe("POST /qr/generate-static", () => {
    it("should generate a static QR code", async () => {
      const response = await request(app)
        .post("/api/qr/generate-static")
        .set("Authorization", `Bearer ${validToken}`)
        .send({ url: "https://example.com", metadata: { campaign: "test" } });

      expect(response.status).toBe(201);
      expect(response.body.qrCode).toHaveProperty("url", "https://example.com");
      expect(response.body.qrCode).toHaveProperty("type", "static");
      expect(response.body.qrCode.metadata).toHaveProperty("campaign", "test");
    });

    it("should fail if no URL is provided for static QR code", async () => {
      const response = await request(app)
        .post("/api/qr/generate-static")
        .set("Authorization", `Bearer ${validToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("URL is required.");
    });

    it("should fail without authentication for static QR code", async () => {
      const response = await request(app)
        .post("/api/qr/generate-static")
        .send({ url: "https://example.com", metadata: { campaign: "test" } });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Access token is missing or invalid.");
    });
  });

  describe("GET /qr/my-codes", () => {
    it("should get a list of the user's QR codes", async () => {
      const response = await request(app)
        .get("/api/qr/my-codes")
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.qrCodes)).toBe(true);
    });

    it("should fail without authentication", async () => {
      const response = await request(app).get("/api/qr/my-codes");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Access token is missing or invalid.");
    });
  });
});
