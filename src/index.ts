import "dotenv/config";

import { buildApp } from "./app.js";

const app = await buildApp();

try {
  await app.listen({ 
    port: Number(process.env.PORT) || 7001,
    host: "0.0.0.0" // Allow outside access if needed, but following task definition port is main thing.
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
