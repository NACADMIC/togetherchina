import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MOCK_CATEGORIES_WITH_PRODUCTS } from "@/lib/mock-data";
import { seedSupplyIfEmpty } from "@/lib/seed-supply";
import { ProductCard } from "@/components/supply/product-card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type CategoryWithProducts = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  products: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    unit: string;
    minOrder: number;
    isActive: boolean;
    categoryId: string;
  }[];
};

async function getCategoriesWithProducts(): Promise<CategoryWithProducts[]> {
  try {
    await seedSupplyIfEmpty();
    return await prisma.productCategory.findMany({
      where: { products: { some: { isActive: true } } },
      orderBy: { sortOrder: "asc" },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          take: 6,
        },
      },
    }) as CategoryWithProducts[];
  } catch {
    return MOCK_CATEGORIES_WITH_PRODUCTS as CategoryWithProducts[];
  }
}

export default async function SupplyPage() {
  const categories = await getCategoriesWithProducts();

  return (
    <div>
      {/* 히어로 */}
      <section className="gradient-hero relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-5">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-card-soft">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">중식당 식자재</h1>
              <p className="text-gray-600 mt-2 mb-6 max-w-xl">
                함께차이나가 직접 공급하는 중식당 필수 식자재. 춘장, 면류, 소스까지 한 번에.
              </p>
              <Link href="/supply/products">
                <Button size="lg" className="shadow-lg shadow-primary/25">
                  전체 상품 보기 →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리별 상품 */}
      <section className="py-14 sm:py-20 gradient-warm">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          {categories.map((cat) => (
            <div key={cat.id} className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-10 rounded-full bg-primary" />
                  <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
                </div>
                <Link
                  href={`/supply/products?category=${cat.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  더보기
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-center py-16 text-gray-500">
              등록된 상품이 없습니다.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-gray-50/80">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
          <div className="rounded-2xl border-2 border-primary/15 bg-white p-8 sm:p-12 text-center shadow-card-soft">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">장바구니에 담고 주문하기</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              로그인 후 장바구니에 담고 주문해주세요. 점주 회원만 구매 가능합니다.
            </p>
            <Link href="/supply/cart">
              <Button variant="secondary" size="lg">장바구니 보기</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
