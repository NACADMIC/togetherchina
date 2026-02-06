import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateMockTalent() {
  let user = await prisma.user.findFirst({
    where: { role: "talent" },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "talent@test.com",
        password: "hashed",
        role: "talent",
        name: "테스트 구직자",
      },
    });
  }
  return user.id;
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getOrCreateMockTalent();
    const body = await req.json();
    const {
      headline,
      position,
      experienceYears,
      bio,
      expectedSalary,
      preferredAreas,
      isPublic,
    } = body;

    if (!headline || !position || !bio) {
      return NextResponse.json(
        { message: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const talent = await prisma.talentProfile.create({
      data: {
        userId,
        headline,
        position,
        experienceYears: Number(experienceYears) || 0,
        bio,
        expectedSalary: expectedSalary ? Number(expectedSalary) : null,
        preferredAreas: preferredAreas || "[]",
        isPublic: isPublic !== false,
      },
    });

    return NextResponse.json({ id: talent.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
