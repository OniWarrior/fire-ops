// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("Admin1234!", 12);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@firealarmops.com" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@firealarmops.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // Create a manager
  const manager = await prisma.user.upsert({
    where: { email: "manager@firealarmops.com" },
    update: {},
    create: {
      name: "Jane Manager",
      email: "manager@firealarmops.com",
      password: await bcrypt.hash("Manager1234!", 12),
      role: Role.MANAGER,
    },
  });

  // Create a technician
  const technician = await prisma.user.upsert({
    where: { email: "tech@firealarmops.com" },
    update: {},
    create: {
      name: "John Tech",
      email: "tech@firealarmops.com",
      password: await bcrypt.hash("Tech1234!", 12),
      role: Role.TECHNICIAN,
    },
  });

  // Create a sample project
  const project = await prisma.project.upsert({
    where: { id: "seed-project-1" },
    update: {},
    create: {
      id: "seed-project-1",
      name: "Riverside Office Complex",
      description: "Full fire alarm installation for 4-floor office complex.",
      status: "IN_PROGRESS",
      address: "123 Riverside Dr, Grand Prairie, TX 75051",
      startDate: new Date("2024-01-15"),
      createdById: admin.id,
    },
  });

  // Add members to project
  await prisma.projectMember.createMany({
    skipDuplicates: true,
    data: [
      { userId: manager.id, projectId: project.id, role: "MANAGER" },
      { userId: technician.id, projectId: project.id, role: "TECHNICIAN" },
    ],
  });

  console.log("✅ Seed complete.");
  console.log("   admin@firealarmops.com   / Admin1234!");
  console.log("   manager@firealarmops.com / Manager1234!");
  console.log("   tech@firealarmops.com    / Tech1234!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
