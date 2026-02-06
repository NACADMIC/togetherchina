"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { POSITION_OPTIONS, SIDO_OPTIONS } from "@/types";

interface JobFiltersProps {
  searchParams: Record<string, string | undefined>;
}

export function JobFilters({ searchParams }: JobFiltersProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const doSearch = () => {
    const next = new URLSearchParams(sp.toString());
    const q = searchRef.current?.value?.trim();
    if (q) next.set("q", q);
    else next.delete("q");
    router.push(`/jobs?${next.toString()}`);
  };

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/jobs?${next.toString()}`);
  };

  const toggleBool = (key: string) => {
    const next = new URLSearchParams(sp.toString());
    const current = next.get(key);
    if (current === "true") next.delete(key);
    else next.set(key, "true");
    router.push(`/jobs?${next.toString()}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-6">
        <form
          className="flex-1 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            doSearch();
          }}
        >
          <div className="relative flex-1 flex">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              ref={searchRef}
              placeholder="검색어 입력"
              defaultValue={searchParams.q}
              className="pl-9 flex-1"
            />
          </div>
          <Button type="submit" size="sm">
            검색
          </Button>
        </form>
        <select
          className="h-11 w-full sm:w-auto min-h-[44px] rounded-lg border border-gray-300 px-4 text-base sm:text-sm"
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
        <select
          className="h-11 w-full sm:w-auto min-h-[44px] rounded-lg border border-gray-300 px-4 text-base sm:text-sm"
          value={searchParams.sido ?? ""}
          onChange={(e) => updateFilter("sido", e.target.value)}
        >
          <option value="">전체 지역</option>
          {SIDO_OPTIONS.map((sido) => (
            <option key={sido} value={sido}>
              {sido}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 [&_button]:min-h-[44px]">
          <Button
            variant={searchParams.urgent === "true" ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleBool("urgent")}
          >
            급구
          </Button>
          <Button
            variant={searchParams.housing === "true" ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleBool("housing")}
          >
            숙소
          </Button>
          <Button
            variant={searchParams.meals === "true" ? "primary" : "secondary"}
            size="sm"
            onClick={() => toggleBool("meals")}
          >
            식사
          </Button>
        </div>
      </div>
    </div>
  );
}
