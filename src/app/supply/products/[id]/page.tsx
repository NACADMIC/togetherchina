import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { AddToCartButton } from "@/components/supply/add-to-cart-button";

interface Props {
  params: Promise<{ id: string }>;
}

type ProductWithCategory = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  minOrder: number;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: { name: string; slug: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  let product: ProductWithCategory | null = null;
  if (id.startsWith("mock-")) {
    const found = MOCK_PRODUCTS.find((p) => p.id === id);
    product = found ? (found as ProductWithCategory) : null;
  } else {
    try {
      product = await prisma.product.findUnique({
        where: { id },
        include: { category: true },
      }) as ProductWithCategory | null;
    } catch {
      product = null;
    }
  }
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <div className="mb-6">
        <Link href="/supply/products" className="text-sm text-gray-500 hover:text-primary">
          ← 상품 목록
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
        <span className="text-sm text-gray-500">{product.category.name}</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
        <p className="text-2xl font-bold text-primary mt-4">
          {product.price.toLocaleString()}원 / {product.unit}
        </p>
        {product.description && (
          <p className="text-gray-600 mt-4">{product.description}</p>
        )}
        {product.minOrder > 1 && (
          <p className="text-sm text-gray-500 mt-2">
            최소 주문 수량: {product.minOrder}{product.unit}
          </p>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
