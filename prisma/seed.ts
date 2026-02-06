import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { id: "mock-employer-1" },
    update: {},
    create: {
      id: "mock-employer-1",
      email: "employer@test.com",
      password: hashedPassword,
      role: "employer",
      name: "테스트 점주",
      phone: "010-1234-5678",
    },
  });

  await prisma.user.upsert({
    where: { email: "talent@test.com" },
    update: {},
    create: {
      email: "talent@test.com",
      password: hashedPassword,
      role: "talent",
      name: "테스트 구직자",
      phone: "010-8765-4321",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
