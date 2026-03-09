import "dotenv/config";

import { randomUUID } from "node:crypto";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { prisma } from "../lib/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("Iniciando o seed...");

  // 1. Criar um usuário fake ou buscar existente
  const TEST_EMAIL = "test_user_seed@fsc.com";
  
  let user = await prisma.user.findUnique({
    where: { email: TEST_EMAIL }
  });

  if (!user) {
    const newUserId = randomUUID();
    user = await prisma.user.create({
      data: {
        id: newUserId,
        name: "Test User (Seed)",
        email: TEST_EMAIL,
        password: "fake-password-hash" // Só pra passar no schema
      }
    });
    console.log(`✅ Usuário de teste criado: ${user.id}`);
  } else {
    console.log(`✅ Usuário de teste já existe: ${user.id}`);
  }

  // 2. Salvar o ID do usuário no .env
  const envPath = path.resolve(__dirname, "../../.env");
  const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";
  
  if (!envContent.includes("TEST_USER_ID=")) {
    fs.appendFileSync(envPath, `\nTEST_USER_ID=${user.id}\n`);
    console.log(`✅ ID salvo no .env!`);
  }

  // 3. Apagar planos existentes do usuário
  const deleted = await prisma.workoutPlan.deleteMany({
    where: { userId: user.id },
  });
  if (deleted.count > 0) {
    console.log(`🗑️  ${deleted.count} plano(s) existente(s) removido(s).`);
  }

  // 4. Ler o JSON
  const jsonPath = path.resolve(__dirname, "../../.backups/workout-plan.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Arquivo JSON não encontrado em: ${jsonPath}`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // 5. Inserir o plano
  const planPayload = {
    userId: user.id,
    name: payload.name,
    description: "Plano importado via seed.",
    isActive: true,
    workoutDays: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      create: payload.workoutDays.map((day: any) => ({
        name: day.name,
        weekDay: day.weekDay,
        isRest: day.isRest,
        estimatedDurationInSeconds: day.estimatedDurationInSeconds,
        exercises: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: day.exercises.map((ex: any) => ({
            name: ex.name,
            order: ex.order,
            sets: ex.sets,
            reps: ex.reps,
            restTimeInSeconds: ex.restTimeInSeconds,
          })),
        },
      })),
    },
  };

  const newPlan = await prisma.workoutPlan.create({
    data: planPayload
  });

  console.log(`✅ Plano de treino inserido com sucesso: ${newPlan.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
