import Link from "next/link";
import { Briefcase, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { TalentCard } from "@/components/talents/talent-card";
import { prisma } from "@/lib/prisma";
import { seedJobsAndTalentsIfEmpty } from "@/lib/seed-jobs-talents";
import { MOCK_JOBS, MOCK_TALENTS } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

async function getRecentJobs() {
  try {
    return await prisma.job.findMany({
      where: { status: "open" },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { employer: { select: { name: true } } },
    });
  } catch {
    return MOCK_JOBS;
  }
}

async function getRecentTalents() {
  try {
    return await prisma.talentProfile.findMany({
      where: { isPublic: true },
      orderBy: { updatedAt: "desc" },
      take: 6,
      include: { user: { select: { name: true } } },
    });
  } catch {
    return MOCK_TALENTS;
  }
}

export default async function HomePage() {
  try {
    await seedJobsAndTalentsIfEmpty();
  } catch {
    // DB 없을 때 스킵 (MVP)
  }
  const [jobs, talents] = await Promise.all([
    getRecentJobs(),
    getRecentTalents(),
  ]);

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="gradient-hero relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-primary/5 blur-2xl" />
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-5 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl leading-tight">
            중식 전문 인재를
            <br />
            <span className="text-primary">찾고 계신가요?</span>
          </h1>
          <p className="mt-6 text-base text-gray-600 sm:text-lg max-w-2xl mx-auto leading-relaxed">
            채용·취업·식자재·커뮤니티를 한곳에서.
            <br />
            <span className="text-gray-700 font-medium">사업주와 인재를 연결하고, 중식업 전 분야를 아우르는 플랫폼</span>
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:flex-wrap sm:gap-4">
            <Link href="/jobs">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                <Briefcase className="mr-2 h-5 w-5" />
                채용공고 보기
              </Button>
            </Link>
            <Link href="/talents">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto border-2 border-primary/20 bg-white hover:bg-primary/5">
                <Users className="mr-2 h-5 w-5" />
                인재 찾기
              </Button>
            </Link>
            <Link href="/supply">
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-primary/5 hover:border-primary/30">
                <Package className="mr-2 h-5 w-5" />
                식자재 주문
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 긴급 채용 섹션 */}
      <section className="py-12 sm:py-20 gradient-warm">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <span className="text-lg font-bold text-red-500">!</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">급구 채용</h2>
                <p className="text-sm text-gray-500 mt-0.5">즉시 근무 가능한 급구 공고</p>
              </div>
            </div>
            <Link
              href="/jobs?urgent=true"
              className="text-sm font-semibold text-primary hover:underline"
            >
              전체보기 →
            </Link>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs
              .filter((j) => j.isUrgent)
              .slice(0, 3)
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            {jobs.filter((j) => j.isUrgent).length === 0 && (
              <p className="col-span-full text-center py-12 text-gray-500">
                현재 긴급 채용 공고가 없습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 최신 채용공고 */}
      <section className="py-12 sm:py-20 bg-gray-50/80">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-primary" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">최신 채용공고</h2>
                <p className="text-sm text-gray-500 mt-0.5">방금 올라온 채용 정보</p>
              </div>
            </div>
            <Link
              href="/jobs"
              className="text-sm font-semibold text-primary hover:underline"
            >
              전체보기 →
            </Link>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {jobs.length === 0 && (
              <p className="col-span-full text-center py-12 text-gray-500">
                등록된 채용공고가 없습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 새로 등록된 인재 */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-primary" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">새로 등록된 인재</h2>
                <p className="text-sm text-gray-500 mt-0.5">경력 있는 중식 전문가들</p>
              </div>
            </div>
            <Link
              href="/talents"
              className="text-sm font-semibold text-primary hover:underline"
            >
              전체보기 →
            </Link>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {talents.slice(0, 6).map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
            {talents.length === 0 && (
              <p className="col-span-full text-center py-12 text-gray-500">
                등록된 인재가 없습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 식자재 CTA */}
      <section className="py-12 sm:py-20 gradient-hero">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          <div className="relative rounded-2xl border-2 border-primary/20 bg-white p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-soft overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">중식당 식자재 직접 납품</h2>
                <p className="text-gray-600 mt-1">춘장, 면류, 소스까지 함께차이나가 직접 공급합니다</p>
              </div>
            </div>
            <Link href="/supply" className="relative">
              <Button size="lg" className="shadow-lg shadow-primary/25">
                식자재 둘러보기 →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 이용 방법 */}
      <section className="py-12 sm:py-20 bg-gray-50/80">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-4 sm:text-2xl">
            이용 방법
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10 sm:mb-14">3단계로 쉽게 시작하세요</p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-card-soft hover:shadow-card-hover transition-shadow">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900">회원가입</h3>
              <p className="mt-2 text-sm text-gray-500">
                점주 또는 구직자로 회원가입
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-card-soft hover:shadow-card-hover transition-shadow">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">공고/프로필 등록</h3>
              <p className="mt-2 text-sm text-gray-500">
                채용공고 또는 이력서 작성
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-card-soft hover:shadow-card-hover transition-shadow">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">매칭</h3>
              <p className="mt-2 text-sm text-gray-500">
                지원하고 연락받기
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
