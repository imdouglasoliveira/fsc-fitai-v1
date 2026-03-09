import "dotenv/config";

import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import apiReference from "@scalar/fastify-api-reference";
import { fromNodeHeaders } from "better-auth/node";
import Fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

import { NotFoundError } from "./errors/index.js";
import { WeekDay } from "./generated/prisma/enums.js";
import { auth } from "./lib/auth.js";
import { 
  ErrorSchema,
  WorkoutPlanSchema
 } from "./schemas/index.js";
import { CreateWorkoutPlan } from "./usecases/CreateWorkoutPlan.js";

const app = Fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Bootcamp Treinos API",
      description: "API para gerenciamento de treinos de musculação.",
      version: "1.0.0",
    },
    servers: [
      {
        description: "Localhost",
        url: "http://localhost:7001",
      },
    ],
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifyCors, {
  origin: ["http://localhost:3000"],
  credentials: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
await app.register(apiReference as any, {
  routePrefix: "/docs",
  configuration: {
    sources: [
      {
        title: "Coach AI",
        slug: "coach-ai",
        version: "1.0.0",
        url: "/swagger.json",
      },
      {
        title: "Auth API",
        slug: "auth-api",
        url: "/api/auth/open-api/generate-schema",
        version: "1.0.0",
      },
    ],
  },
});

// Declare routes



app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  schema: {
    description: "Hello world!",
    tags: ["hello"],
    response: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  handler: () => {
    return { message: "Hello world!" };
  },
});

app.route({
  method: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      const url = new URL(request.url, `http://${request.hostname}`);

      const headers = new Headers();
      for (const [key, value] of Object.entries(request.headers)) {
        if (typeof value === "string") {
          headers.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        }
      }

      const body =
        request.method !== "GET" && request.method !== "HEAD" && request.body
          ? JSON.stringify(request.body)
          : undefined;

      const betterAuthRequest = new Request(url, {
        method: request.method,
        headers,
        body,
      });

      const response = await auth.handler(betterAuthRequest);

      reply.status(response.status);
      response.headers.forEach((value: string, key: string) => {
        reply.header(key, value);
      });

      reply.send(await response.text());
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  },
});

// Run the server!
try {
  await app.listen({ port: Number(process.env.PORT) || 7001 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
