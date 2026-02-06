import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateMockTalent() {
  let user = await prisma.user.findFirst({
    where: { role: "talent" },
    include: { talentProfile: true },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "talent@test.com",
        password: "hashed",
        role: "talent",
        name: "테스트 구직자",
      },
      include: { talentProfile: true },
    });
  }
  if (!user.talentProfile) {
    const profile = await prisma.talentProfile.create({
      data: {
        userId: user.id,
        headline: "테스트 프로필",
        position: "assistant",
        bio: "테스트용 프로필입니다.",
        preferredAreas: "[]",
      },
    });
    return profile.id;
  }
  return user.talentProfile.id;
}

export async function POST(req: NextRequest) {
  try {
    const talentId = await getOrCreateMockTalent();
    const { jobId, message } = await req.json();

    if (!jobId) {
      return NextResponse.json(
        { message: "공고를 선택해주세요." },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.status !== "open") {
      return NextResponse.json(
        { message: "유효하지 않은 공고입니다." },
        { status: 400 }
      );
    }

    const existing = await prisma.application.findUnique({
      where: {
        jobId_talentId: { jobId, talentId },
      },
    });
    if (existing) {
      return NextResponse.json(
        { message: "이미 지원한 공고입니다." },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      prisma.application.create({
        data: { jobId, talentId, message: message || null },
      }),
      prisma.job.update({
        where: { id: jobId },
        data: { applicants: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
