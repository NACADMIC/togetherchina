import Link from "next/link";
import { MessageSquare, MapPin } from "lucide-react";
import { SIDO_OPTIONS } from "@/types";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getPostCountsByRegion(): Promise<Record<string, number>> {
  try {
    const counts = await prisma.communityPost.groupBy({
      by: ["region"],
      _count: { id: true },
    });
    return Object.fromEntries(counts.map((c) => [c.region, c._count.id]));
  } catch {
    return {};
  }
}

export default async function CommunityPage() {
  const counts = await getPostCountsByRegion();

  return (
    <div className="min-h-screen gradient-warm">
      <div className="mx-auto max-w-[720px] px-4 sm:px-5 py-8 sm:py-12">
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">함께수다</h1>
          </div>
          <p className="text-gray-600">
            지역별로 모여 소통하는 중식당 업계 커뮤니티입니다.
          </p>
        </section>

        <ul className="grid gap-4 sm:grid-cols-2">
          {SIDO_OPTIONS.map((region) => {
            const count = counts[region] ?? 0;
            return (
              <li key={region}>
                <Link
                  href={`/community/${encodeURIComponent(region)}`}
                  className="group flex items-center justify-between rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-card-soft hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-gray-900">{region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">{count}개 글</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
