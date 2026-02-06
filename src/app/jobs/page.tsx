import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MOCK_JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

interface SearchParams {
  searchParams: Promise<{
    q?: string;
    position?: string;
    sido?: string;
    urgent?: string;
    housing?: string;
    meals?: string;
  }>;
}

export default async function JobsPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const { q, position, sido, urgent, housing, meals } = params;

  const where: Record<string, unknown> = { status: "open" };
  if (q) where.OR = [{ title: { contains: q } }, { description: { contains: q } }];
  if (position) where.position = position;
  if (sido) where.sido = sido;
  if (urgent === "true") where.isUrgent = true;
  if (housing === "true") where.housing = true;
  if (meals === "true") where.meals = true;

  let jobs: Awaited<ReturnType<typeof prisma.job.findMany>> = [];
  try {
    jobs = await prisma.job.findMany({
      where,
      orderBy: [{ isUrgent: "desc" }, { createdAt: "desc" }],
      include: { employer: { select: { name: true } } },
    });
  } catch {
    jobs = MOCK_JOBS;
  }

  return (
    <div className="min-h-screen gradient-warm">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-5 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">채용공고</h1>
          </div>
        <Link href="/jobs/write">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            공고 등록
          </Button>
        </Link>
      </div>
      <JobFilters searchParams={params} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
          <p className="col-span-full text-center py-16 text-gray-500">
            조건에 맞는 채용공고가 없습니다.
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
