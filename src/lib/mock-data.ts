/**
 * DB 없을 때 표시할 기본 샘플 데이터 (MVP)
 * 중식당 업계에 맞는 데이터만 포함 (고추장 X)
 */

export const MOCK_JOBS = [
  { id: "mock-job-1", title: "경력 주방장 구합니다", position: "head_chef", salaryMin: 350, salaryMax: 450, salaryUnit: "monthly", sido: "서울", sigungu: "강남구", housing: true, meals: true, isUrgent: true, views: 42, applicants: 5, employer: { name: "홍콩반점" } },
  { id: "mock-job-2", title: "면요리 전문 요리사", position: "noodle", salaryMin: 300, salaryMax: 380, salaryUnit: "monthly", sido: "서울", sigungu: "송파구", housing: false, meals: true, isUrgent: false, views: 28, applicants: 3, employer: { name: "홍콩반점" } },
  { id: "mock-job-3", title: "주방보조 급구", position: "assistant", salaryMin: 12000, salaryMax: 15000, salaryUnit: "hourly", sido: "인천", sigungu: "남동구", housing: true, meals: true, isUrgent: true, views: 67, applicants: 12, employer: { name: "중화요리" } },
  { id: "mock-job-4", title: "조리장 모집 (웍 전문)", position: "wok", salaryMin: 320, salaryMax: 400, salaryUnit: "monthly", sido: "경기", sigungu: "성남시", housing: false, meals: true, isUrgent: false, views: 35, applicants: 4, employer: { name: "유성중화" } },
  { id: "mock-job-5", title: "홀서빙·배달 통합", position: "server", salaryMin: 180, salaryMax: 220, salaryUnit: "daily", sido: "서울", sigungu: "마포구", housing: false, meals: true, isUrgent: false, views: 21, applicants: 2, employer: { name: "차이나팩토리" } },
  { id: "mock-job-6", title: "배달원 시급", position: "delivery", salaryMin: 18000, salaryMax: 22000, salaryUnit: "hourly", sido: "경기", sigungu: "부천시", housing: false, meals: false, isUrgent: true, views: 89, applicants: 18, employer: { name: "짬뽕천국" } },
  { id: "mock-job-7", title: "매니저급 주방장", position: "head_chef", salaryMin: 450, salaryMax: 550, salaryUnit: "monthly", sido: "서울", sigungu: "강남구", housing: true, meals: true, isUrgent: false, views: 15, applicants: 1, employer: { name: "딤섬팩토리" } },
  { id: "mock-job-8", title: "면장 급구", position: "noodle", salaryMin: 280, salaryMax: 350, salaryUnit: "monthly", sido: "부산", sigungu: "해운대구", housing: true, meals: true, isUrgent: true, views: 54, applicants: 7, employer: { name: "동해중화" } },
  { id: "mock-job-9", title: "주방보조 주 5일", position: "assistant", salaryMin: 200, salaryMax: 250, salaryUnit: "daily", sido: "대구", sigungu: "수성구", housing: false, meals: true, isUrgent: false, views: 33, applicants: 5, employer: { name: "대구중화" } },
  { id: "mock-job-10", title: "경력 조리장", position: "wok", salaryMin: 340, salaryMax: 420, salaryUnit: "monthly", sido: "광주", sigungu: "서구", housing: false, meals: true, isUrgent: false, views: 19, applicants: 2, employer: { name: "광주중식" } },
  { id: "mock-job-11", title: "점장·매니저", position: "manager", salaryMin: 280, salaryMax: 350, salaryUnit: "monthly", sido: "서울", sigungu: "종로구", housing: false, meals: true, isUrgent: false, views: 41, applicants: 6, employer: { name: "북경반점" } },
  { id: "mock-job-12", title: "야간 주방보조", position: "assistant", salaryMin: 15000, salaryMax: 18000, salaryUnit: "hourly", sido: "인천", sigungu: "부평구", housing: false, meals: true, isUrgent: true, views: 72, applicants: 9, employer: { name: "인천중화" } },
];

export const MOCK_TALENTS = [
  { id: "mock-talent-1", headline: "10년 경력 중식 주방장", position: "head_chef", experienceYears: 10, bio: "중식당 다수 근무 경험. 짜장·짬뽕·탕수육 등 전 메뉴 가능합니다.", expectedSalary: 400, preferredAreas: '["서울", "경기"]', user: { name: "김중식" } },
  { id: "mock-talent-2", headline: "면요리 7년 경력", position: "noodle", experienceYears: 7, bio: "손짜장, 간짜장 전문. 당면·우동 등 면류 전반 가능.", expectedSalary: 350, preferredAreas: '["서울", "인천"]', user: { name: "이면장" } },
  { id: "mock-talent-3", headline: "조리장 5년 / 웍 전문", position: "wok", experienceYears: 5, bio: "볶음요리, 탕수육, 꿔바로우 등 웍 요리 전문.", expectedSalary: 320, preferredAreas: '["경기"]', user: { name: "박조리" } },
  { id: "mock-talent-4", headline: "주방보조 3년 / 즉시 근무", position: "assistant", experienceYears: 3, bio: "설거지, 재료 손질, 보조 조리 가능. 성실합니다.", expectedSalary: 250, preferredAreas: '["서울", "경기", "인천"]', user: { name: "최보조" } },
  { id: "mock-talent-5", headline: "15년 베테랑 주방장", position: "head_chef", experienceYears: 15, bio: "대형 체인점 경력. 메뉴 개발·인력 관리 가능.", expectedSalary: 500, preferredAreas: '["서울"]', user: { name: "정대리" } },
  { id: "mock-talent-6", headline: "면장 8년 / 손짜장 특화", position: "noodle", experienceYears: 8, bio: "손짜장, 삼선짜장 전문. 속도와 맛 모두 보장.", expectedSalary: 380, preferredAreas: '["서울", "경기"]', user: { name: "한면장" } },
  { id: "mock-talent-7", headline: "배달·홀 겸무 가능", position: "delivery", experienceYears: 2, bio: "오토바이 면허 보유. 배달·홀서빙 동시 가능.", expectedSalary: 200, preferredAreas: '["경기"]', user: { name: "송배달" } },
  { id: "mock-talent-8", headline: "웍 조리 6년", position: "wok", experienceYears: 6, bio: "꿔바로우, 유니짜장, 마파두부 등 볶음요리 전문.", expectedSalary: 340, preferredAreas: '["부산", "경남"]', user: { name: "강웍" } },
  { id: "mock-talent-9", headline: "매니저·점장 경력", position: "manager", experienceYears: 4, bio: "홀 운영, 인력 관리, 재고 관리 경험.", expectedSalary: 300, preferredAreas: '["서울", "경기"]', user: { name: "윤매니저" } },
  { id: "mock-talent-10", headline: "신입 주방보조", position: "assistant", experienceYears: 0, bio: "열정만 있습니다. 배우려는 자세로 임하겠습니다.", expectedSalary: null, preferredAreas: '["서울"]', user: { name: "신입김" } },
];

export const MOCK_CATEGORIES = [
  { id: "mock-cat-1", name: "춘장/소스", slug: "sauce", sortOrder: 1 },
  { id: "mock-cat-2", name: "면류", slug: "noodle", sortOrder: 2 },
  { id: "mock-cat-3", name: "만두/유부", slug: "dumpling", sortOrder: 3 },
  { id: "mock-cat-4", name: "채소/고기", slug: "fresh", sortOrder: 4 },
  { id: "mock-cat-5", name: "기타", slug: "etc", sortOrder: 5 },
];

export const MOCK_PRODUCTS = [
  { id: "mock-prod-1", name: "춘장 1kg", price: 8500, unit: "개", description: "중식당 필수 춘장", minOrder: 1, isActive: true, categoryId: "mock-cat-1", category: { name: "춘장/소스", slug: "sauce" } },
  { id: "mock-prod-2", name: "짬뽕소스 1kg", price: 12000, unit: "개", description: "해물짬뽕·기스짬뽕용", minOrder: 1, isActive: true, categoryId: "mock-cat-1", category: { name: "춘장/소스", slug: "sauce" } },
  { id: "mock-prod-3", name: "두반장 500g", price: 6500, unit: "개", description: "마파두부용", minOrder: 1, isActive: true, categoryId: "mock-cat-1", category: { name: "춘장/소스", slug: "sauce" } },
  { id: "mock-prod-4", name: "마라소스 1kg", price: 15000, unit: "개", description: "마라탕/마라샹궈", minOrder: 1, isActive: true, categoryId: "mock-cat-1", category: { name: "춘장/소스", slug: "sauce" } },
  { id: "mock-prod-5", name: "꿔바로우 소스 500g", price: 9500, unit: "개", description: "탕수육 전용", minOrder: 1, isActive: true, categoryId: "mock-cat-1", category: { name: "춘장/소스", slug: "sauce" } },
  { id: "mock-prod-6", name: "굴소스 500g", price: 7800, unit: "개", description: "유니짜장·볶음요리용", minOrder: 1, isActive: true, categoryId: "mock-cat-1", category: { name: "춘장/소스", slug: "sauce" } },
  { id: "mock-prod-7", name: "짜장면 1인분", price: 1200, unit: "개", description: null, minOrder: 10, isActive: true, categoryId: "mock-cat-2", category: { name: "면류", slug: "noodle" } },
  { id: "mock-prod-8", name: "짬뽕면 1인분", price: 1300, unit: "개", description: null, minOrder: 10, isActive: true, categoryId: "mock-cat-2", category: { name: "면류", slug: "noodle" } },
  { id: "mock-prod-9", name: "우동면 1인분", price: 1100, unit: "개", description: null, minOrder: 10, isActive: true, categoryId: "mock-cat-2", category: { name: "면류", slug: "noodle" } },
  { id: "mock-prod-10", name: "당면 1kg", price: 4500, unit: "개", description: "잡채/당면국수", minOrder: 1, isActive: true, categoryId: "mock-cat-2", category: { name: "면류", slug: "noodle" } },
  { id: "mock-prod-11", name: "만두피 1kg", price: 8500, unit: "개", description: "군만두/찐만두", minOrder: 1, isActive: true, categoryId: "mock-cat-3", category: { name: "만두/유부", slug: "dumpling" } },
  { id: "mock-prod-12", name: "군만두 20개", price: 12000, unit: "박스", description: null, minOrder: 1, isActive: true, categoryId: "mock-cat-3", category: { name: "만두/유부", slug: "dumpling" } },
  { id: "mock-prod-13", name: "유부 100g", price: 3500, unit: "개", description: null, minOrder: 1, isActive: true, categoryId: "mock-cat-3", category: { name: "만두/유부", slug: "dumpling" } },
  { id: "mock-prod-14", name: "대파 1kg", price: 4500, unit: "kg", description: null, minOrder: 1, isActive: true, categoryId: "mock-cat-4", category: { name: "채소/고기", slug: "fresh" } },
  { id: "mock-prod-15", name: "배추 1포기", price: 3500, unit: "개", description: null, minOrder: 1, isActive: true, categoryId: "mock-cat-4", category: { name: "채소/고기", slug: "fresh" } },
  { id: "mock-prod-16", name: "식용유 18L", price: 45000, unit: "통", description: null, minOrder: 1, isActive: true, categoryId: "mock-cat-5", category: { name: "기타", slug: "etc" } },
  { id: "mock-prod-17", name: "전분 1kg", price: 5500, unit: "개", description: "꿔바로우·탕수육", minOrder: 1, isActive: true, categoryId: "mock-cat-5", category: { name: "기타", slug: "etc" } },
  { id: "mock-prod-18", name: "참기름 500ml", price: 12000, unit: "개", description: null, minOrder: 1, isActive: true, categoryId: "mock-cat-5", category: { name: "기타", slug: "etc" } },
];

/** 식자재 메인 페이지용 (카테고리별 상품) */
export const MOCK_CATEGORIES_WITH_PRODUCTS = [
  { id: "mock-cat-1", name: "춘장/소스", slug: "sauce", sortOrder: 1, products: MOCK_PRODUCTS.filter((p) => p.categoryId === "mock-cat-1") },
  { id: "mock-cat-2", name: "면류", slug: "noodle", sortOrder: 2, products: MOCK_PRODUCTS.filter((p) => p.categoryId === "mock-cat-2") },
  { id: "mock-cat-3", name: "만두/유부", slug: "dumpling", sortOrder: 3, products: MOCK_PRODUCTS.filter((p) => p.categoryId === "mock-cat-3") },
  { id: "mock-cat-4", name: "채소/고기", slug: "fresh", sortOrder: 4, products: MOCK_PRODUCTS.filter((p) => p.categoryId === "mock-cat-4") },
  { id: "mock-cat-5", name: "기타", slug: "etc", sortOrder: 5, products: MOCK_PRODUCTS.filter((p) => p.categoryId === "mock-cat-5") },
];
