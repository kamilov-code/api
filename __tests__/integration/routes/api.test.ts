import request from "supertest";
import app from "@/app";

describe("GET /api", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/api");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Cannot GET /" });
  });
});
