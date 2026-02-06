import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MOCK_JOBS } from "@/lib/mock-data";
import { ApplyForm } from "@/components/jobs/apply-form";

interface Props {
  params: Promise<{ id: string }>;
}

type JobWithEmployer = { title: string; status: string; employer?: { name: string } | null };

export default async function ApplyPage({ params }: Props) {
  const { id } = await params;

  let job: JobWithEmployer | null = null;
  if (id.startsWith("mock-")) {
    const mock = MOCK_JOBS.find((j) => j.id === id);
    if (mock) {
      job = { ...mock, status: "open" };
    }
  } else {
    try {
      const fetched = await prisma.job.findUnique({
        where: { id },
        include: { employer: { select: { name: true } } },
      });
      job = fetched;
    } catch {
      job = null;
    }
  }
  if (!job || job.status !== "open") notFound();

  return (
    <div className="mx-auto max-w-[560px] px-5 py-8">
      <div className="mb-6">
        <Link href={`/jobs/${id}`} className="text-sm text-gray-500 hover:text-primary">
          ← 공고로 돌아가기
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-6">{job.employer?.name ?? ""}</p>
      <ApplyForm jobId={id} />
    </div>
  );
}
