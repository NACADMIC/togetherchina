"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POSITION_OPTIONS } from "@/types";

interface TalentFormTalent {
  id: string;
  headline?: string;
  position?: string;
  experienceYears?: number;
  bio?: string;
  expectedSalary?: number | null;
  preferredAreas?: string;
  isPublic?: boolean;
}

export function TalentForm({ talent }: { talent?: TalentFormTalent }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const preferredAreas = formData.get("preferredAreas") as string;
    const areas = preferredAreas
      ? preferredAreas.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
      : [];

    const data = {
      headline: formData.get("headline") as string,
      position: formData.get("position") as string,
      experienceYears: Number(formData.get("experienceYears")) || 0,
      bio: formData.get("bio") as string,
      expectedSalary: formData.get("expectedSalary")
        ? Number(formData.get("expectedSalary"))
        : null,
      preferredAreas: JSON.stringify(areas),
      isPublic: formData.get("isPublic") === "on",
    };

    try {
      const res = await fetch("/api/talents", {
        method: talent ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(talent ? { ...data, id: talent.id } : data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "저장에 실패했습니다.");
      }

      const { id } = await res.json();
      router.push(`/talents/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const defaultAreas = (() => {
    if (!talent?.preferredAreas) return "";
    try {
      const parsed = JSON.parse(talent.preferredAreas);
      return Array.isArray(parsed) ? parsed.join(", ") : "";
    } catch {
      return "";
    }
  })();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          한줄 소개 *
        </label>
        <Input
          name="headline"
          required
          placeholder="예: 10년 경력 중식 주방장"
          defaultValue={talent?.headline}
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
          defaultValue={talent?.position}
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
          경력 (년)
        </label>
        <Input
          name="experienceYears"
          type="number"
          min={0}
          defaultValue={talent?.experienceYears ?? 0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상세 소개 *
        </label>
        <textarea
          name="bio"
          required
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="경력, 강점, 희망 조건 등을 작성해주세요."
          defaultValue={talent?.bio}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          희망 급여 (만원)
        </label>
        <Input
          name="expectedSalary"
          type="number"
          placeholder="예: 350"
          defaultValue={talent?.expectedSalary ?? undefined}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          희망 지역 (쉼표로 구분)
        </label>
        <Input
          name="preferredAreas"
          placeholder="예: 서울, 경기, 인천"
          defaultValue={defaultAreas}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="isPublic"
          defaultChecked={talent?.isPublic !== false}
        />
        <span className="text-sm">프로필 공개</span>
      </label>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "저장 중..." : "등록하기"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
