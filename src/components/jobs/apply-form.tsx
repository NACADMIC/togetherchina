"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ApplyFormProps {
  jobId: string;
}

export function ApplyForm({ jobId }: ApplyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, message }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "지원에 실패했습니다.");
      }

      router.push(`/jobs/${jobId}`);
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
          지원 메시지 (선택)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="점주님께 전하고 싶은 말을 적어주세요."
        />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "지원 중..." : "지원하기"}
        </Button>
        <Link href={`/jobs/${jobId}`}>
          <Button type="button" variant="secondary">
            취소
          </Button>
        </Link>
      </div>
    </form>
  );
}
