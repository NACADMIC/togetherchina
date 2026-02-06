# 함께차이나 - 빠른 시작

## 1. 설치 및 DB 설정

```bash
npm install
npx prisma generate
npx prisma db push
```

## 2. 실행

```bash
npm run dev
```

http://localhost:3000 접속

## 3. 첫 접속 시

- **메인**: 자동으로 채용공고 3개, 인재 2명 시드
- **식자재**: `/supply` 접속 시 자동으로 상품 16종 시드

## 4. 테스트 플로우

### 채용
1. `/jobs` - 채용공고 목록 (검색/필터)
2. `/jobs/write` - 공고 등록
3. `/jobs/[id]` - 상세 → 지원하기
4. `/talents` - 인재 목록
5. `/talents/write` - 프로필 등록

### 식자재
1. `/supply` - 상품 목록
2. 상품 카드 "장바구니" 클릭
3. `/supply/cart` - 배송지 입력 후 주문
4. `/my/orders` - 주문 내역

### 마이페이지
- `/my` - 대시보드
- `/my/jobs` - 내 채용공고
- `/my/orders` - 주문 내역
