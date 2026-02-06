"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POSITION_OPTIONS, SIDO_OPTIONS, SALARY_UNIT_LABELS } from "@/types";

interface JobFormJob {
  id: string;
  title?: string;
  position?: string;
  description?: string;
  requirements?: string | null;
  salaryMin?: number;
  salaryMax?: number;
  salaryUnit?: string;
  sido?: string;
  sigungu?: string;
  address?: string | null;
  housing?: boolean;
  meals?: boolean;
  insurance?: boolean;
  isUrgent?: boolean;
}

export function JobForm({ job }: { job?: JobFormJob }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      title: formData.get("title") as string,
      position: formData.get("position") as string,
      description: formData.get("description") as string,
      requirements: formData.get("requirements") as string,
      salaryMin: Number(formData.get("salaryMin")),
      salaryMax: Number(formData.get("salaryMax")),
      salaryUnit: formData.get("salaryUnit") as string,
      sido: formData.get("sido") as string,
      sigungu: formData.get("sigungu") as string,
      address: formData.get("address") as string,
      housing: formData.get("housing") === "on",
      meals: formData.get("meals") === "on",
      insurance: formData.get("insurance") === "on",
      isUrgent: formData.get("isUrgent") === "on",
    };

    try {
      const res = await fetch("/api/jobs", {
        method: job ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job ? { ...data, id: job.id } : data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "저장에 실패했습니다.");
      }

      const { id } = await res.json();
      router.push(`/jobs/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          공고 제목 *
        </label>
        <Input
          name="title"
          required
          placeholder="예: 경력 5년 이상 주방장 구합니다"
          defaultValue={job?.title}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          포지션 *
        </label>
        <select
          name="position"
          required
          className="h-11 w-full rounded-lg border border-gray-300 px-4"
          defaultValue={job?.position}
        >
          {POSITION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상세 내용 *
        </label>
        <textarea
          name="description"
          required
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="업무 내용, 근무 조건 등을 상세히 작성해주세요."
          defaultValue={job?.description}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          자격요건
        </label>
        <textarea
          name="requirements"
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="경력, 자격 등"
          defaultValue={job?.requirements ?? undefined}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            최소 급여 *
          </label>
          <Input
            name="salaryMin"
            type="number"
            required
            defaultValue={job?.salaryMin ?? undefined}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            최대 급여 *
          </label>
          <Input
            name="salaryMax"
            type="number"
            required
            defaultValue={job?.salaryMax ?? undefined}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            급여 단위 *
          </label>
          <select
            name="salaryUnit"
            required
            className="h-11 w-full rounded-lg border border-gray-300 px-4"
            defaultValue={job?.salaryUnit ?? "monthly"}
          >
            {Object.entries(SALARY_UNIT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시/도 *
          </label>
          <select
            name="sido"
            required
            className="h-11 w-full rounded-lg border border-gray-300 px-4"
            defaultValue={job?.sido}
          >
            {SIDO_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시/군/구 *
          </label>
          <Input
            name="sigungu"
            required
            placeholder="예: 강남구"
            defaultValue={job?.sigungu}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상세 주소
          </label>
          <Input
            name="address"
            placeholder="동, 호수 등"
            defaultValue={job?.address ?? undefined}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="housing" defaultChecked={!!job?.housing} />
          <span className="text-sm">숙소 제공</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="meals" defaultChecked={!!job?.meals} />
          <span className="text-sm">식사 제공</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="insurance" defaultChecked={!!job?.insurance} />
          <span className="text-sm">4대보험</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isUrgent" defaultChecked={!!job?.isUrgent} />
          <span className="text-sm text-red-600 font-medium">급구</span>
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "저장 중..." : "등록하기"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
