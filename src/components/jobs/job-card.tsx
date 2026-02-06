import Link from "next/link";
import { MapPin, Eye, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSITION_LABELS } from "@/types";
import type { Position } from "@/types";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    position: string;
    salaryMin: number;
    salaryMax: number;
    salaryUnit: string;
    sido: string;
    sigungu: string;
    housing: boolean;
    meals: boolean;
    isUrgent: boolean;
    views: number;
    applicants: number;
    employer?: { name: string };
  };
}

function formatSalary(min: number, max: number, unit: string) {
  const unitLabel = unit === "monthly" ? "만원" : unit === "daily" ? "원/일" : "원/시";
  if (min === max) return `${min.toLocaleString()}${unitLabel}`;
  return `${min.toLocaleString()}~${max.toLocaleString()}${unitLabel}`;
}

export function JobCard({ job }: JobCardProps) {
  const positionLabel = POSITION_LABELS[job.position as Position] || job.position;

  return (
    <Link href={`/jobs/${job.id}`} className="block h-full group">
      <Card className="h-full cursor-pointer group-hover:border-primary/30">
        <div className="flex flex-wrap gap-2 mb-3">
          {job.isUrgent && (
            <Badge variant="urgent">급구</Badge>
          )}
          <Badge variant="default">{positionLabel}</Badge>
          {(job.housing || job.meals) && (
            <Badge variant="primary">
              {[job.housing && "숙소", job.meals && "식사"].filter(Boolean).join("/")}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {job.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {formatSalary(job.salaryMin, job.salaryMax, job.salaryUnit)}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{job.sido} {job.sigungu}</span>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {job.views}회
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {job.applicants}명 지원
          </span>
        </div>
      </Card>
    </Link>
  );
}
