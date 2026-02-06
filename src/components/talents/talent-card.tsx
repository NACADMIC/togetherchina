import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POSITION_LABELS } from "@/types";
import type { Position } from "@/types";

interface TalentCardProps {
  talent: {
    id: string;
    headline: string;
    position: string;
    experienceYears: number;
    bio: string;
    expectedSalary: number | null;
    preferredAreas: string;
    user?: { name: string };
  };
}

export function TalentCard({ talent }: TalentCardProps) {
  const positionLabel = POSITION_LABELS[talent.position as Position] || talent.position;
  const areas = (() => {
    try {
      const parsed = JSON.parse(talent.preferredAreas);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  return (
    <Link href={`/talents/${talent.id}`} className="block h-full group">
      <Card className="h-full cursor-pointer group-hover:border-primary/30">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-lg">
            {talent.user?.name?.charAt(0) || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <Badge variant="default" className="mb-2">
              {positionLabel}
            </Badge>
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {talent.headline}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {talent.bio}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {areas.length > 0 ? areas.join(", ") : "희망지역 미설정"}
              </span>
            </div>
            {talent.expectedSalary && (
              <p className="text-sm text-primary font-medium mt-2">
                희망급여 {talent.expectedSalary.toLocaleString()}만원~
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
