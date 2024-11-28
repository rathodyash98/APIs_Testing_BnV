describe("QR Code API", () => {
    it("should generate a dynamic QR code", async () => {
      const response = await request(app)
        .post("/qr/generate")
        .set("Authorization", `Bearer VALID_TOKEN`)
        .send({ initialUrl: "https://example.com" });
      expect(response.status).toBe(201);
      expect(response.body.dynamicId).toBeDefined();
      expect(response.body.qrImage).toBeDefined();
    });
  });
  