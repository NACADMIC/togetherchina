import { TalentForm } from "@/components/talents/talent-form";

export default async function WriteTalentPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">프로필 작성</h1>
      <TalentForm />
    </div>
  );
}
