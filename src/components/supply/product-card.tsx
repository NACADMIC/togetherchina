"use client";

import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    unit: string;
    description: string | null;
    minOrder: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("supply-cart") || "[]");
    const existing = cart.find((i: { productId: string }) => i.productId === product.id);
    if (existing) {
      existing.quantity += product.minOrder;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        minOrder: product.minOrder,
        quantity: product.minOrder,
      });
    }
    localStorage.setItem("supply-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("supply-cart-update"));
  };

  return (
    <Link href={`/supply/products/${product.id}`} className="block h-full group">
      <Card className="h-full flex flex-col group-hover:border-primary/30">
        <div className="flex-1 p-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <Package className="h-6 w-6 text-primary/60" />
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          )}
          <p className="text-lg font-bold text-primary mt-2">
            {product.price.toLocaleString()}원 / {product.unit}
          </p>
          {product.minOrder > 1 && (
            <p className="text-xs text-gray-400 mt-1">최소 {product.minOrder}{product.unit}부터</p>
          )}
        </div>
        <div className="p-4 pt-0">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={addToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            장바구니
          </Button>
        </div>
      </Card>
    </Link>
  );
}
