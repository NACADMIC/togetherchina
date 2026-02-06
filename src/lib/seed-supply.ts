import { prisma } from "./prisma";

const categories = [
  { name: "춘장/소스", slug: "sauce", sortOrder: 1 },
  { name: "면류", slug: "noodle", sortOrder: 2 },
  { name: "만두/유부", slug: "dumpling", sortOrder: 3 },
  { name: "채소/고기", slug: "fresh", sortOrder: 4 },
  { name: "기타", slug: "etc", sortOrder: 5 },
];

const products: { categorySlug: string; name: string; price: number; unit: string; description?: string; minOrder?: number }[] = [
  { categorySlug: "sauce", name: "춘장 1kg", price: 8500, unit: "개", description: "중식당 필수 춘장" },
  { categorySlug: "sauce", name: "짬뽕소스 1kg", price: 12000, unit: "개", description: "해물짬뽕·기스짬뽕용" },
  { categorySlug: "sauce", name: "두반장 500g", price: 6500, unit: "개", description: "마파두부용" },
  { categorySlug: "sauce", name: "마라소스 1kg", price: 15000, unit: "개", description: "마라탕/마라샹궈" },
  { categorySlug: "sauce", name: "꿔바로우 소스 500g", price: 9500, unit: "개", description: "탕수육 전용" },
  { categorySlug: "noodle", name: "당면 1kg", price: 4500, unit: "개", description: "잡채/당면국수" },
  { categorySlug: "noodle", name: "짜장면 1인분", price: 1200, unit: "개", minOrder: 10 },
  { categorySlug: "noodle", name: "짬뽕면 1인분", price: 1300, unit: "개", minOrder: 10 },
  { categorySlug: "noodle", name: "우동면 1인분", price: 1100, unit: "개", minOrder: 10 },
  { categorySlug: "dumpling", name: "만두피 1kg", price: 8500, unit: "개", description: "군만두/찐만두" },
  { categorySlug: "dumpling", name: "군만두 20개", price: 12000, unit: "박스" },
  { categorySlug: "dumpling", name: "유부 100g", price: 3500, unit: "개" },
  { categorySlug: "fresh", name: "대파 1kg", price: 4500, unit: "kg" },
  { categorySlug: "fresh", name: "배추 1포기", price: 3500, unit: "개" },
  { categorySlug: "etc", name: "식용유 18L", price: 45000, unit: "통" },
  { categorySlug: "etc", name: "전분 1kg", price: 5500, unit: "개" },
];

export async function seedSupplyIfEmpty() {
  const count = await prisma.productCategory.count();
  if (count > 0) return;

  for (const cat of categories) {
    await prisma.productCategory.create({ data: cat });
  }

  for (const p of products) {
    const category = await prisma.productCategory.findUnique({
      where: { slug: p.categorySlug },
    });
    if (!category) continue;
    await prisma.product.create({
      data: {
        categoryId: category.id,
        name: p.name,
        price: p.price,
        unit: p.unit,
        description: p.description || null,
        minOrder: p.minOrder || 1,
        stock: 999,
      },
    });
  }
}
