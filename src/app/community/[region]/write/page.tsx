import { CommunityPostForm } from "@/components/community/post-form";
import { SIDO_OPTIONS } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ region: string }>;
}

export default async function WriteCommunityPage({ params }: Props) {
  const { region } = await params;
  const decoded = decodeURIComponent(region);

  if (!SIDO_OPTIONS.includes(decoded)) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-5 py-6 sm:py-8">
      <Link
        href={`/community/${encodeURIComponent(decoded)}`}
        className="text-sm text-gray-500 hover:text-primary mb-4 inline-block"
      >
        ← {decoded} 목록으로
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {decoded} 함께수다 글쓰기
      </h1>
      <CommunityPostForm region={decoded} />
    </div>
  );
}
