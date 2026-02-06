import { JobForm } from "@/components/jobs/job-form";

export default async function WriteJobPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">채용공고 작성</h1>
      <JobForm />
    </div>
  );
}
