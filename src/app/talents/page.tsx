import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MOCK_TALENTS } from "@/lib/mock-data";
import { TalentCard } from "@/components/talents/talent-card";
import { TalentFilters } from "@/components/talents/talent-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

type TalentListItem = {
  id: string;
  headline: string;
  position: string;
  experienceYears: number;
  bio: string;
  expectedSalary: number | null;
  preferredAreas: string;
  user?: { name: string } | null;
};

interface SearchParams {
  searchParams: Promise<{
    q?: string;
    position?: string;
  }>;
}

export default async function TalentsPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const { q, position } = params;

  const where: Record<string, unknown> = { isPublic: true };
  if (q) where.OR = [{ headline: { contains: q } }, { bio: { contains: q } }];
  if (position) where.position = position;

  let talents: TalentListItem[] = [];
  try {
    talents = await prisma.talentProfile.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: { user: { select: { name: true } } },
    }) as TalentListItem[];
  } catch {
    talents = MOCK_TALENTS as TalentListItem[];
  }

  return (
    <div className="min-h-screen gradient-warm">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-5 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">인재 찾기</h1>
          </div>
          <Link href="/talents/write">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              프로필 등록
            </Button>
          </Link>
      </div>
      <TalentFilters searchParams={params} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {talents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
        {talents.length === 0 && (
          <p className="col-span-full text-center py-16 text-gray-500">
            조건에 맞는 인재가 없습니다.
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
