import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Eye, Users, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MOCK_JOBS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { POSITION_LABELS } from "@/types";
import type { Position } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

function formatSalary(min: number, max: number, unit: string) {
  const unitLabel = unit === "monthly" ? "만원" : unit === "daily" ? "원/일" : "원/시";
  if (min === max) return `${min.toLocaleString()}${unitLabel}`;
  return `${min.toLocaleString()}~${max.toLocaleString()}${unitLabel}`;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;

  let job: Awaited<ReturnType<typeof prisma.job.findUnique>> | null = null;
  if (id.startsWith("mock-")) {
    const mock = MOCK_JOBS.find((j) => j.id === id);
    if (mock) {
      job = {
        ...mock,
        description: "상세 업무 내용은 지원 시 안내드립니다.",
        requirements: null,
        address: mock.sido && mock.sigungu ? `${mock.sido} ${mock.sigungu}` : "",
        insurance: false,
        employer: { ...mock.employer, phone: null },
      } as unknown as Awaited<ReturnType<typeof prisma.job.findUnique>>;
    }
  } else {
    try {
      job = await prisma.job.findUnique({
        where: { id },
        include: { employer: { select: { name: true, phone: true } } },
      });
    } catch {
      job = null;
    }
  }
  if (!job) notFound();

  prisma.job.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {});

  const positionLabel = POSITION_LABELS[job.position as Position] || job.position;

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8">
      <div className="mb-6">
        <Link href="/jobs" className="text-sm text-gray-500 hover:text-primary">
          ← 목록으로
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {job.isUrgent && <Badge variant="urgent">급구</Badge>}
          <Badge variant="default">{positionLabel}</Badge>
          {job.housing && <Badge variant="primary">숙소제공</Badge>}
          {job.meals && <Badge variant="primary">식사제공</Badge>}
          {job.insurance && <Badge variant="primary">4대보험</Badge>}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.title}</h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {job.employer?.name}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {job.sido} {job.sigungu} {job.address}
          </span>
          <span className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {job.views}회 조회
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {job.applicants}명 지원
          </span>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">급여</h3>
            <p className="text-lg text-primary font-semibold">
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryUnit)}
            </p>
          </div>

          {job.requirements && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">자격요건</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{job.requirements}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">상세 내용</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href={`/jobs/${job.id}/apply`}>
            <Button size="lg">지원하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
