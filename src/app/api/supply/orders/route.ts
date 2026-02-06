import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateMockEmployer() {
  let user = await prisma.user.findFirst({
    where: { role: "employer" },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "employer@test.com",
        password: "hashed",
        role: "employer",
        name: "테스트 점주",
      },
    });
  }
  return user.id;
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getOrCreateMockEmployer();
    const body = await req.json();
    const { items, deliveryAddress, deliveryPhone, deliveryNote } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "장바구니가 비어 있습니다." },
        { status: 400 }
      );
    }

    if (!deliveryAddress || !deliveryPhone) {
      return NextResponse.json(
        { message: "배송지 정보를 입력해주세요." },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product || !product.isActive) {
        return NextResponse.json(
          { message: `상품 "${item.productId}"을(를) 찾을 수 없습니다.` },
          { status: 400 }
        );
      }
      const qty = Math.max(product.minOrder, item.quantity || product.minOrder);
      const price = item.price ?? product.price;
      totalAmount += price * qty;
      orderItems.push({ productId: product.id, quantity: qty, price });
    }

    const order = await prisma.supplyOrder.create({
      data: {
        userId,
        totalAmount,
        deliveryAddress,
        deliveryPhone,
        deliveryNote: deliveryNote || null,
        status: "pending",
        items: {
          create: orderItems,
        },
      },
    });

    return NextResponse.json({ orderId: order.id, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
