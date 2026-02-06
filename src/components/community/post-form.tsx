"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommunityPostFormProps {
  region: string;
}

export function CommunityPostForm({ region }: CommunityPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, region }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "저장에 실패했습니다.");
      }

      const { id } = await res.json();
      router.push(`/community/post/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const listHref = `/community/${encodeURIComponent(region)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          제목 *
        </label>
        <Input name="title" required placeholder="제목을 입력하세요" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          내용 *
        </label>
        <textarea
          name="content"
          required
          rows={10}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="내용을 입력하세요"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "등록하기"}
        </Button>
        <Link href={listHref}>
          <Button type="button" variant="secondary">
            취소
          </Button>
        </Link>
      </div>
    </form>
  );
}
