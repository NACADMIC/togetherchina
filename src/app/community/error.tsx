"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function CommunityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-5 py-6 sm:py-8">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 mb-2">페이지를 불러올 수 없습니다</h2>
        <p className="text-sm text-gray-600 mb-4">
          데이터베이스 연결을 확인해주세요. .env에 DATABASE_URL을 설정하고
          <code className="mx-1 rounded bg-gray-200 px-1">npx prisma db push</code>
          를 실행해주세요.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={reset}>다시 시도</Button>
          <Link href="/">
            <Button variant="secondary">홈으로</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
