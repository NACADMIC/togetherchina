# 밖에서 접속 + DB 포함 전체 기능 (Vercel)

## 1. Neon DB 생성 (무료, 2분)

1. https://neon.tech 가입
2. **New Project** → 프로젝트명 입력
3. **Connection string** 복사 (예: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

## 2. GitHub 푸시

```bash
git init
git add .
git commit -m "Initial"
git remote add origin https://github.com/내아이디/저장소.git
git push -u origin main
```

## 3. Vercel 배포

1. https://vercel.com 가입 (GitHub 로그인)
2. **Add New** → **Project** → 저장소 선택
3. **Environment Variables** → `DATABASE_URL` 추가 (1번에서 복사한 URL)
4. **Deploy**

## 4. 배포 후

- `https://프로젝트명.vercel.app` 접속
- 메인(`/`), 식자재(`/supply`) 한 번씩 열면 시드 데이터 자동 생성

---

**로컬 개발**: `.env`에 `DATABASE_URL` 넣고 `npx prisma db push` 후 `npm run dev`
