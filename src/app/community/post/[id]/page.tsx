import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Eye } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommunityPostPage({ params }: Props) {
  const { id } = await params;

  let post = null;
  try {
    post = await prisma.communityPost.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    });
  } catch {
    post = null;
  }
  if (!post) notFound();

  prisma.communityPost.update({
    where: { id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  const regionHref = `/community/${encodeURIComponent(post.region)}`;

  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-5 py-6 sm:py-8">
      <div className="mb-6">
        <Link href={regionHref} className="text-sm text-gray-500 hover:text-primary">
          ← {post.region} 목록으로
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="text-xs text-primary font-medium mb-2">{post.region}</div>
        <h1 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <span>{post.author.name}</span>
          <span>{new Date(post.createdAt).toLocaleString("ko-KR")}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.views}회 조회
          </span>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
