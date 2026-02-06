import { prisma } from "./prisma";

export async function seedJobsAndTalentsIfEmpty() {
  const [jobCount, talentCount] = await Promise.all([
    prisma.job.count(),
    prisma.talentProfile.count(),
  ]);
  if (jobCount > 0 && talentCount > 0) return;

  let employer = await prisma.user.findFirst({ where: { role: "employer" } });
  if (!employer) {
    employer = await prisma.user.create({
      data: {
        email: "employer@test.com",
        password: "hashed",
        role: "employer",
        name: "홍콩반점",
      },
    });
  }

  if (jobCount === 0) {
    await prisma.job.createMany({
      data: [
        { employerId: employer.id, title: "경력 주방장 구합니다", position: "head_chef", description: "5년 이상 경력자", salaryMin: 350, salaryMax: 450, salaryUnit: "monthly", sido: "서울", sigungu: "강남구", housing: true, meals: true, isUrgent: true },
        { employerId: employer.id, title: "면요리 전문 요리사", position: "noodle", description: "짜장면/짬뽕 전문", salaryMin: 300, salaryMax: 380, salaryUnit: "monthly", sido: "경기", sigungu: "성남시", housing: false, meals: true },
        { employerId: employer.id, title: "주방보조 급구", position: "assistant", description: "즉시 근무 가능자", salaryMin: 12000, salaryMax: 15000, salaryUnit: "hourly", sido: "인천", sigungu: "남동구", housing: true, meals: true, isUrgent: true },
      ],
    });
  }

  if (talentCount === 0) {
    let u1 = await prisma.user.findFirst({ where: { email: "talent@test.com" } });
    if (!u1) u1 = await prisma.user.create({ data: { email: "talent@test.com", password: "hashed", role: "talent", name: "김중식" } });
    await prisma.talentProfile.upsert({
      where: { userId: u1.id },
      create: { userId: u1.id, headline: "10년 경력 중식 주방장", position: "head_chef", experienceYears: 10, bio: "중식당 다수 근무 경험.", expectedSalary: 400, preferredAreas: "[]" },
      update: {},
    });

    let u2 = await prisma.user.findFirst({ where: { email: "talent2@test.com" } });
    if (!u2) u2 = await prisma.user.create({ data: { email: "talent2@test.com", password: "hashed", role: "talent", name: "이면장" } });
    const existing2 = await prisma.talentProfile.findUnique({ where: { userId: u2.id } });
    if (!existing2) {
      await prisma.talentProfile.create({
        data: { userId: u2.id, headline: "면요리 7년 경력", position: "noodle", experienceYears: 7, bio: "손짜장, 간짜장 전문.", expectedSalary: 350, preferredAreas: "[]" },
      });
    }
  }
}
