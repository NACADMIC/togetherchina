"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  unit: string;
  minOrder: number;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("supply-cart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("supply-cart");
      setCart(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("storage", handler);
    window.addEventListener("supply-cart-update", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("supply-cart-update", handler);
    };
  }, []);

  const updateQuantity = (productId: string, delta: number) => {
    const next = cart.map((item) => {
      if (item.productId !== productId) return item;
      const q = Math.max(item.minOrder, item.quantity + delta);
      return { ...item, quantity: q };
    });
    setCart(next);
    localStorage.setItem("supply-cart", JSON.stringify(next));
  };

  const removeItem = (productId: string) => {
    const next = cart.filter((i) => i.productId !== productId);
    setCart(next);
    localStorage.setItem("supply-cart", JSON.stringify(next));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!deliveryAddress.trim() || !deliveryPhone.trim()) {
      alert("배송지와 연락처를 입력해주세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/supply/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
          deliveryAddress: deliveryAddress.trim(),
          deliveryPhone: deliveryPhone.trim(),
          deliveryNote: deliveryNote.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "주문 실패");
      }
      const { orderId } = await res.json();
      localStorage.removeItem("supply-cart");
      router.push(`/my/orders/${orderId}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "주문에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-5 py-6 sm:py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">장바구니</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-6">장바구니가 비어 있습니다.</p>
          <Link href="/supply/products">
            <Button>상품 둘러보기</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()}원 / {item.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, -item.minOrder)}
                    className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 touch-manipulation"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.minOrder)}
                    className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 touch-manipulation"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 w-24 text-right">
                    {(item.price * item.quantity).toLocaleString()}원
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-gray-400 hover:text-red-600 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">배송 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">배송지 주소 *</label>
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="주소 전체를 입력해주세요"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                <Input
                  value={deliveryPhone}
                  onChange={(e) => setDeliveryPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">배송 메모</label>
                <Input
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="배송 시 요청사항 (선택)"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>총 결제금액</span>
              <span className="text-primary">{total.toLocaleString()}원</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              * 결제는 추후 연동 예정입니다. 주문 접수 후 연락드립니다.
            </p>
            <Button onClick={handleCheckout} className="w-full" disabled={loading}>
              {loading ? "주문 중..." : "주문하기"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
