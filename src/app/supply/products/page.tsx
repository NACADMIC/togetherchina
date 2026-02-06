import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { seedSupplyIfEmpty } from "@/lib/seed-supply";
import { ProductCard } from "@/components/supply/product-card";

export const dynamic = "force-dynamic";

interface SearchParams {
  searchParams: Promise<{ category?: string }>;
}

export default async function SupplyProductsPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const categorySlug = params.category;

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let categories: Awaited<ReturnType<typeof prisma.productCategory.findMany>> = [];
  try {
    await seedSupplyIfEmpty();
    const where: { isActive: boolean; categoryId?: string } = { isActive: true };
    if (categorySlug) {
      const cat = await prisma.productCategory.findUnique({
        where: { slug: categorySlug },
      });
      if (cat) where.categoryId = cat.id;
    }
    products = await prisma.product.findMany({
      where,
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    });
    categories = await prisma.productCategory.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    products = categorySlug
      ? MOCK_PRODUCTS.filter((p) => p.category?.slug === categorySlug)
      : MOCK_PRODUCTS;
    categories = MOCK_CATEGORIES;
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-5 py-6 sm:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">전체 상품</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <a
          href="/supply/products"
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !categorySlug ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          전체
        </a>
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/supply/products?category=${cat.slug}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              categorySlug === cat.slug ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </a>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-center py-16 text-gray-500">
            상품이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
