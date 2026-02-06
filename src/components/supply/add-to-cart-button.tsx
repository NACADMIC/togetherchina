"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    unit: string;
    minOrder: number;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(product.minOrder);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("supply-cart") || "[]");
    const existing = cart.find((i: { productId: string }) => i.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        minOrder: product.minOrder,
        quantity,
      });
    }
    localStorage.setItem("supply-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    router.push("/supply/cart");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">수량:</label>
        <Input
          type="number"
          min={product.minOrder}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
          className="w-24"
        />
        <span className="text-sm text-gray-500">{product.unit}</span>
      </div>
      <Button onClick={addToCart}
        className="sm:flex-1"
      >
        장바구니에 담기 ({(product.price * quantity).toLocaleString()}원)
      </Button>
    </div>
  );
}
