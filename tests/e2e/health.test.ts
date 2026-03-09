import { beforeAll, describe, expect, it } from "vitest";
import { createApp } from "./setup.js";
import { FastifyInstance } from "fastify";

describe("Health Check E2E", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createApp();
  });

  it("should return Hello world!", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "Hello world!" });
  });
});
