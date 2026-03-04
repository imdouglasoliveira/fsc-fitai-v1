import { describe, expect, it } from "vitest";

describe("setup", () => {
  it("vitest está funcionando", () => {
    expect(1 + 1).toBe(2);
  });

  it("ambiente é Node.js", () => {
    expect(typeof process).toBe("object");
    expect(typeof process.env).toBe("object");
  });
});
