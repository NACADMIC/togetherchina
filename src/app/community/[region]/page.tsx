import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { SIDO_OPTIONS } from "@/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ region: string }>;
}

async function getPosts(region: string) {
  try {
    return await prisma.communityPost.findMany({
      where: { region },
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export default async function CommunityRegionPage({ params }: Props) {
  const { region } = await params;
  const decoded = decodeURIComponent(region);

  if (!SIDO_OPTIONS.includes(decoded)) notFound();

  const posts = await getPosts(decoded);

  return (
    <div className="min-h-screen gradient-warm">
      <div className="mx-auto max-w-[720px] px-4 sm:px-5 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/community" className="text-sm text-gray-500 hover:text-primary mb-2 inline-block">
              ← 지역 선택
            </Link>
            <div className="flex items-center gap-3 mt-1">
              <div className="h-1 w-10 rounded-full bg-primary" />
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{decoded} 함께수다</h1>
            </div>
          </div>
        <Link href={`/community/${encodeURIComponent(decoded)}/write`}>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            글쓰기
          </Button>
        </Link>
      </div>

      <p className="text-gray-600 mb-6">
        {decoded} 지역 중식당 업계 종사자들이 소통하는 공간입니다.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-gray-200 bg-gray-50">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">아직 글이 없습니다.</p>
          <Link href={`/community/${encodeURIComponent(decoded)}/write`}>
            <Button>첫 글 작성하기</Button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/community/post/${post.id}`}
                className="block rounded-xl border border-gray-200 p-4 hover:border-primary/30 hover:bg-gray-50/50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 line-clamp-1">{post.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span>{post.author.name}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
                  <span>{post.views}회 조회</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
