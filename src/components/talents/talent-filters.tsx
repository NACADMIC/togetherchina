"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { POSITION_OPTIONS } from "@/types";

interface TalentFiltersProps {
  searchParams: Record<string, string | undefined>;
}

export function TalentFilters({ searchParams }: TalentFiltersProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const doSearch = () => {
    const next = new URLSearchParams(sp.toString());
    const q = searchRef.current?.value?.trim();
    if (q) next.set("q", q);
    else next.delete("q");
    router.push(`/talents?${next.toString()}`);
  };

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/talents?${next.toString()}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <form
          className="relative flex-1 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            doSearch();
          }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            ref={searchRef}
            placeholder="검색어 입력"
            defaultValue={searchParams.q}
            className="pl-9 flex-1"
          />
          <Button type="submit" size="sm">
            검색
          </Button>
        </form>
        <select
          className="h-11 rounded-lg border border-gray-300 px-4 text-sm"
          value={searchParams.position ?? ""}
          onChange={(e) => updateFilter("position", e.target.value)}
        >
          <option value="">전체 포지션</option>
          {POSITION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
