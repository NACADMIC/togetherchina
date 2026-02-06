export type Position =
  | "head_chef"
  | "noodle"
  | "wok"
  | "assistant"
  | "delivery"
  | "manager"
  | "server";

export const POSITION_LABELS: Record<Position, string> = {
  head_chef: "주방장",
  noodle: "면장",
  wok: "조리장",
  assistant: "주방보조",
  delivery: "배달",
  manager: "매니저",
  server: "홀서빙",
};

export const POSITION_OPTIONS = Object.entries(POSITION_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export type SalaryUnit = "monthly" | "daily" | "hourly";

export const SALARY_UNIT_LABELS: Record<SalaryUnit, string> = {
  monthly: "월급",
  daily: "일급",
  hourly: "시급",
};

export const SIDO_OPTIONS = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "대전",
  "광주",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];
