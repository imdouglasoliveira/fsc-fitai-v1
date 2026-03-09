import "dotenv/config";

import { FastifyInstance } from "fastify";

import { buildApp } from "../../src/app.js";
import { auth } from "../../src/lib/auth.js";
import { prisma } from "../../src/lib/db.js";

export async function createApp(): Promise<FastifyInstance> {
  const app = await buildApp({ logger: false });
  await app.ready();
  return app;
}

export async function createTestUser(_app: FastifyInstance): Promise<{
  userId: string;
  headers: Record<string, string>;
}> {
  const email = `test-${Date.now()}@example.com`;
  const password = "password123";
  const name = "Test User";

  const user = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  if (!user || !user.user) {
    throw new Error("Failed to create test user");
  }

  const session = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!session || !session.token) {
    throw new Error("Failed to sign in test user");
  }

  return {
    userId: user.user.id,
    headers: {
      Authorization: `Bearer ${session.token}`,
      cookie: `better-auth.session_token=${session.token}`,
    },
  };
}

export async function cleanDatabase(): Promise<void> {
  const tables = [
    "user_metrics",
    "exercise_set_log",
    "WorkoutSession",
    "WorkoutExercise",
    "WorkoutDay",
    "WorkoutPlan",
    "user_train_data",
    "user_assessment",
    "session",
    "account",
    "verification",
    "user",
  ];

  for (const table of tables) {
    try {
      // Use double quotes for camelCase table names in PG
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    } catch (err) {
      console.warn(`Failed to truncate table ${table}, maybe it doesn't exist yet or spelling is off. Error:`, err);
    }
  }
}
