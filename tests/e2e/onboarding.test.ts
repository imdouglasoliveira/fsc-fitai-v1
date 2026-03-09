import { FastifyInstance } from "fastify";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { cleanDatabase,createApp, createTestUser } from "./setup.js";

describe("Onboarding E2E", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createApp();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  it("should complete onboarding successfully", async () => {
    const { headers } = await createTestUser(app);

    const onboardingData = {
      goal: "GAIN_MUSCLE",
      experienceLevel: "BEGINNER",
      trainingFrequency: "DAYS_3",
      sessionDuration: "MIN_45_60",
      heightInCentimeters: 180,
      weightInGrams: 75000,
      age: 25,
      activityLevel: "MEDIUM",
      equipmentAccess: "FULL_GYM",
      injuryOrRestriction: "None",
    };

    const response = await app.inject({
      method: "POST",
      url: "/user/onboarding",
      headers,
      payload: onboardingData,
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body).toMatchObject({
      type: "ONBOARDING",
      goal: "GAIN_MUSCLE",
      heightInCentimeters: 180,
      weightInGrams: 75000,
    });
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  it("should return onboarding status correctly", async () => {
    const { headers } = await createTestUser(app);

    // Initial status
    const initialStatusResponse = await app.inject({
      method: "GET",
      url: "/user/onboarding/status",
      headers,
    });

    expect(initialStatusResponse.statusCode).toBe(200);
    expect(initialStatusResponse.json()).toEqual({
      completed: false,
      completedAt: null,
    });

    // Complete onboarding
    await app.inject({
      method: "POST",
      url: "/user/onboarding",
      headers,
      payload: {
        goal: "GAIN_MUSCLE",
        experienceLevel: "BEGINNER",
        trainingFrequency: "DAYS_3",
        sessionDuration: "MIN_45_60",
        heightInCentimeters: 180,
        weightInGrams: 75000,
        age: 25,
      },
    });

    // Final status
    const finalStatusResponse = await app.inject({
      method: "GET",
      url: "/user/onboarding/status",
      headers,
    });

    expect(finalStatusResponse.statusCode).toBe(200);
    const finalStatusBody = finalStatusResponse.json();
    expect(finalStatusBody.completed).toBe(true);
    expect(finalStatusBody.completedAt).not.toBeNull();
  });

  it("should not allow completing onboarding twice", async () => {
    const { headers } = await createTestUser(app);

    const onboardingData = {
      goal: "GAIN_MUSCLE",
      experienceLevel: "BEGINNER",
      trainingFrequency: "DAYS_3",
      sessionDuration: "MIN_45_60",
      heightInCentimeters: 180,
      weightInGrams: 75000,
      age: 25,
    };

    // First time
    const response1 = await app.inject({
      method: "POST",
      url: "/user/onboarding",
      headers,
      payload: onboardingData,
    });
    expect(response1.statusCode).toBe(201);

    // Second time
    const response2 = await app.inject({
      method: "POST",
      url: "/user/onboarding",
      headers,
      payload: onboardingData,
    });

    expect(response2.statusCode).toBe(409);
    expect(response2.json().code).toBe("ONBOARDING_ALREADY_COMPLETED_ERROR");
  });

  it("should return 401 for unauthorized access", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/user/onboarding/status",
    });

    expect(response.statusCode).toBe(401);
  });
});
