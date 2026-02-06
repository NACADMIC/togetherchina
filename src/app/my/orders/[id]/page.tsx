import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "결제 대기",
  confirmed: "확인됨",
  preparing: "준비 중",
  shipped: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  let order = null;
  try {
    order = await prisma.supplyOrder.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        user: { select: { name: true } },
      },
    });
  } catch {
    order = null;
  }
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <div className="mb-6">
        <Link href="/supply" className="text-sm text-gray-500 hover:text-primary">
          ← 식자재 메인
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-bold text-gray-900">주문 #{order.id.slice(-8)}</h1>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
            {STATUS_LABELS[order.status] || order.status}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <p>주문일: {new Date(order.createdAt).toLocaleString("ko-KR")}</p>
          <p>배송지: {order.deliveryAddress}</p>
          <p>연락처: {order.deliveryPhone}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">주문 상품</h3>
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.product.name} x {item.quantity}{item.product.unit}
                </span>
                <span>{(item.price * item.quantity).toLocaleString()}원</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mt-4 pt-4 border-t">
            <span>총 결제금액</span>
            <span className="text-primary">{order.totalAmount.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
