import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JobCard } from "@/components/jobs/job-card";

export const dynamic = "force-dynamic";

export default async function MyJobsPage() {
  let jobs: Awaited<ReturnType<typeof prisma.job.findMany>> = [];
  try {
    const employer = await prisma.user.findFirst({ where: { role: "employer" } });
    if (employer) {
      jobs = await prisma.job.findMany({
        where: { employerId: employer.id },
        orderBy: { createdAt: "desc" },
        include: { employer: { select: { name: true } } },
      });
    }
  } catch {
    // DB 없을 때 (MVP)
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/my" className="text-sm text-gray-500 hover:text-primary">
          ← 마이페이지
        </Link>
        <Link href="/jobs/write">
          <span className="text-sm font-medium text-primary hover:underline">+ 공고 등록</span>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">내 채용공고</h1>

      {jobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">등록된 공고가 없습니다.</p>
          <Link href="/jobs/write" className="text-primary font-medium hover:underline">
            채용공고 등록하기
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
