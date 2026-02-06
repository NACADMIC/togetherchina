import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateUser() {
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "user@test.com",
        password: "hashed",
        role: "employer",
        name: "커뮤니티회원",
      },
    });
  }
  return user.id;
}

export async function POST(req: NextRequest) {
  try {
    const authorId = await getOrCreateUser();
    const { title, content, region } = await req.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { message: "제목과 내용을 입력해주세요." },
        { status: 400 }
      );
    }

    const post = await prisma.communityPost.create({
      data: {
        authorId,
        region: region?.trim() || "서울",
        title: title.trim(),
        content: content.trim(),
      },
    });

    return NextResponse.json({ id: post.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
