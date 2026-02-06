# 함께차이나 - 중식 전문 채용 플랫폼

중식당 업계 특화 채용 플랫폼입니다. 숨고 스타일의 클린하고 모던한 UI/UX를 제공합니다.

## 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (개발용, 프로덕션에서는 PostgreSQL 권장)

## 시작하기

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

http://localhost:3000 접속

**시드**: 메인/식자재 첫 접속 시 자동으로 샘플 데이터 생성됨 (별도 시드 명령 불필요)

## 주요 기능

- **점주**: 채용공고 등록/수정, 인재 검색, **식자재 주문**
- **구직자**: 프로필 등록, 채용공고 탐색 및 지원
- **식자재**: 함께차이나 직접 납품 (춘장, 면류, 소스 등)
- **공통**: 회원가입/로그인, 검색/필터, 반응형 디자인

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 메인 (히어로 + 최신 공고/인재) |
| `/jobs` | 채용공고 목록 |
| `/jobs/[id]` | 채용공고 상세 |
| `/jobs/write` | 채용공고 작성 |
| `/talents` | 인재 목록 |
| `/talents/[id]` | 인재 상세 |
| `/talents/write` | 프로필 작성 |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/notice` | 공지사항 |
| `/supply` | 식자재 메인 |
| `/supply/products` | 상품 목록 |
| `/supply/products/[id]` | 상품 상세 |
| `/supply/cart` | 장바구니 |
| `/my/orders/[id]` | 주문 상세 |

## 환경 변수

프로덕션 배포 시 `.env` 파일에 다음을 설정하세요:

- `DATABASE_URL`: PostgreSQL 연결 문자열 (프로덕션)
- `NEXTAUTH_SECRET`: NextAuth 세션 암호화용
- `NEXTAUTH_URL`: 앱 URL

## 개발 우선순위

- [x] MVP: 인증, 채용공고 CRUD, 인재 프로필 CRUD, 필터/검색
- [ ] v1.1: 지원하기, 마이페이지, 북마크
- [ ] v1.2: 포인트/결제, 알림, PWA
