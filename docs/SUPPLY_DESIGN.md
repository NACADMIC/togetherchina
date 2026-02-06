# 식자재 직접 납품 설계서

## 1. 비즈니스 모델

- **함께차이나**가 직접 식자재를 공급
- 기존 채용 플랫폼 점주(employer)를 타깃
- 마진 모델: 도매가 → 소매가 판매

---

## 2. 상품 카테고리

| 카테고리 | 예시 상품 |
|----------|----------|
| 춘장/소스 | 춘장, 고추장, 두반장, 마라소스, 꿔바로우소스 |
| 면류 | 당면, 짜장면, 짬뽕면, 우동면 |
| 만두/유부 | 만두피, 군만두, 유부 |
| 채소/고기 | 대파, 배추, 돼지고기, 닭가슴살 |
| 기타 | 식용유, 전분, 후추 등 |

---

## 3. 사용자 플로우

```
점주 로그인 → 상품 둘러보기 → 장바구니 담기 → 주문/결제 → 배송
```

---

## 4. 데이터 모델

### ProductCategory
- name, slug, sortOrder

### Product
- categoryId, name, description, price, unit, minOrder, stock
- imageUrl, isActive

### SupplyOrder
- userId, status, totalAmount
- deliveryAddress, deliveryPhone, deliveryNote
- paidAt, shippedAt, deliveredAt

### SupplyOrderItem
- orderId, productId, quantity, price (주문 시점 가격)

---

## 5. 주문 상태

| 상태 | 설명 |
|------|------|
| pending | 주문 접수 (결제 대기) |
| confirmed | 결제 완료, 준비 중 |
| preparing | 배송 준비 중 |
| shipped | 배송 출발 |
| delivered | 배송 완료 |
| cancelled | 취소 |

---

## 6. 페이지 구조

| 경로 | 설명 | 접근 |
|------|------|------|
| /supply | 식자재 메인 (카테고리 + 인기상품) | 전체 |
| /supply/products | 상품 목록 (필터: 카테고리) | 전체 |
| /supply/products/[id] | 상품 상세 | 전체 |
| /supply/cart | 장바구니 | 로그인(점주) |
| /supply/checkout | 주문/결제 | 로그인(점주) |
| /my/orders | 주문 내역 | 로그인 |

---

## 7. 개발 우선순위

### Phase 1 (MVP)
- [x] 상품 카테고리/상품 CRUD (시드 데이터)
- [x] 상품 목록/상세 페이지
- [x] 장바구니 (로컬스토리지 또는 DB)
- [x] 주문 API (결제는 추후 연동)

### Phase 2
- [ ] 결제 연동 (토스페이먼츠, PG)
- [ ] 주문 내역 페이지
- [ ] 관리자: 재고/주문 관리

### Phase 3
- [ ] 정기배송 구독
- [ ] 세트 상품 (중식당 필수 10종 등)
