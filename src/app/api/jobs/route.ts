import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateEmployer() {
  let u = await prisma.user.findFirst({ where: { role: "employer" } });
  if (!u) u = await prisma.user.create({ data: { email: "employer@test.com", password: "x", role: "employer", name: "테스트점주" } });
  return u.id;
}

export async function POST(req: NextRequest) {
  try {
    const employerId = await getOrCreateEmployer();
    const body = await req.json();
    const {
      title,
      position,
      description,
      requirements,
      salaryMin,
      salaryMax,
      salaryUnit,
      sido,
      sigungu,
      address,
      housing,
      meals,
      insurance,
      isUrgent,
    } = body;

    if (!title || !position || !description || !sido || !sigungu) {
      return NextResponse.json(
        { message: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        employerId,
        title,
        position,
        description,
        requirements: requirements || null,
        salaryMin: Number(salaryMin) || 0,
        salaryMax: Number(salaryMax) || 0,
        salaryUnit: salaryUnit || "monthly",
        sido,
        sigungu,
        address: address || null,
        housing: !!housing,
        meals: !!meals,
        insurance: !!insurance,
        isUrgent: !!isUrgent,
      },
    });

    return NextResponse.json({ id: job.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
