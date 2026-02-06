import Link from "next/link";
import { Briefcase, User, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getMyData() {
  try {
    const employer = await prisma.user.findFirst({ where: { role: "employer" } });
    if (!employer) return { jobs: [], orders: [] };
    const [jobs, orders] = await Promise.all([
      prisma.job.findMany({
        where: { employerId: employer.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.supplyOrder.findMany({
        where: { userId: employer.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: { include: { product: true } } },
      }),
    ]);
    return { jobs, orders };
  } catch {
    return { jobs: [], orders: [] };
  }
}

export default async function MyPage() {
  const { jobs, orders } = await getMyData();

  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">마이페이지</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              내 채용공고
            </h2>
            <Link href="/jobs/write" className="text-sm text-primary hover:underline">
              + 등록
            </Link>
          </div>
          {jobs.length === 0 ? (
            <p className="text-gray-500 text-sm">등록된 공고가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {jobs.map((j) => (
                <li key={j.id}>
                  <Link href={`/jobs/${j.id}`} className="text-sm hover:text-primary">
                    {j.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/my/jobs" className="text-sm text-primary mt-2 inline-block">
            전체보기 →
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5" />
              식자재 주문내역
            </h2>
            <Link href="/supply" className="text-sm text-primary hover:underline">
              주문하기
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">주문 내역이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id}>
              <Link href={`/my/orders/${o.id}`} className="text-sm hover:text-primary">
                {o.totalAmount.toLocaleString()}원 · {new Date(o.createdAt).toLocaleDateString("ko-KR")}
              </Link>
            </li>
          ))}
            </ul>
          )}
          <Link href="/my/orders" className="text-sm text-primary mt-2 inline-block">
            전체보기 →
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <User className="h-5 w-5" />
          빠른 메뉴
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/jobs/write">
            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20">
              채용공고 등록
            </span>
          </Link>
          <Link href="/talents/write">
            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">
              프로필 등록
            </span>
          </Link>
          <Link href="/supply/cart">
            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200">
              장바구니
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
