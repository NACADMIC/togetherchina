import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  pending: "결제 대기",
  confirmed: "확인됨",
  preparing: "준비 중",
  shipped: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

export default async function MyOrdersPage() {
  let orders: Awaited<ReturnType<typeof prisma.supplyOrder.findMany>> = [];
  try {
    const employer = await prisma.user.findFirst({ where: { role: "employer" } });
    if (employer) {
      orders = await prisma.supplyOrder.findMany({
        where: { userId: employer.id },
        orderBy: { createdAt: "desc" },
        include: { items: { include: { product: true } } },
      });
    }
  } catch {
    // DB 없을 때 (MVP)
  }

  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <div className="mb-6">
        <Link href="/my" className="text-sm text-gray-500 hover:text-primary">
          ← 마이페이지
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">주문 내역</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">주문 내역이 없습니다.</p>
          <Link href="/supply" className="text-primary font-medium hover:underline">
            식자재 둘러보기
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/my/orders/${o.id}`}
                className="block rounded-xl border border-gray-200 p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {o.totalAmount.toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleString("ko-KR")}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {STATUS_LABELS[o.status] || o.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
