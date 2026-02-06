import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MOCK_TALENTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { POSITION_LABELS } from "@/types";
import type { Position } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

type TalentWithUser = {
  id: string;
  userId: string;
  headline: string;
  position: string;
  experienceYears: number;
  bio: string;
  expectedSalary: number | null;
  preferredAreas: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: { name: string; phone?: string | null } | null;
};

export default async function TalentDetailPage({ params }: Props) {
  const { id } = await params;

  let talent: TalentWithUser | null = null;
  if (id.startsWith("mock-")) {
    const mock = MOCK_TALENTS.find((t) => t.id === id);
    if (mock) {
      talent = mock as TalentWithUser;
    }
  } else {
    try {
      talent = await prisma.talentProfile.findUnique({
        where: { id },
        include: { user: { select: { name: true, phone: true } } },
      }) as TalentWithUser | null;
    } catch {
      talent = null;
    }
  }
  if (!talent) notFound();

  const positionLabel = POSITION_LABELS[talent.position as Position] || talent.position;
  const areas = (() => {
    try {
      const parsed = JSON.parse(talent.preferredAreas);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8">
      <div className="mb-6">
        <Link href="/talents" className="text-sm text-gray-500 hover:text-primary">
          ← 목록으로
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex items-start gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {talent.user?.name?.charAt(0) || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <Badge variant="default" className="mb-2">
              {positionLabel}
            </Badge>
            <h1 className="text-2xl font-bold text-gray-900">{talent.headline}</h1>
            <p className="text-gray-600 mt-1">{talent.user?.name}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">
                경력 {talent.experienceYears}년
              </span>
              {talent.expectedSalary && (
                <span className="text-sm text-primary font-medium">
                  희망급여 {talent.expectedSalary.toLocaleString()}만원~
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              소개
            </h3>
            <p className="text-gray-600 whitespace-pre-wrap">{talent.bio}</p>
          </div>

          {areas.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                희망 지역
              </h3>
              <p className="text-gray-600">{areas.join(", ")}</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button size="lg">연락하기</Button>
        </div>
      </div>
    </div>
  );
}
