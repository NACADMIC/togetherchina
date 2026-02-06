# Netlify 배포 가이드

## MVP: DB 없이 배포 (현재 설정)

**DB 없이도 사이트가 뜹니다.** 빈 목록/빈 상태로 표시됩니다.

- 빌드 시 `DATABASE_URL` 필요: Netlify에서 **빌드용 더미 값** 설정
  - Key: `DATABASE_URL`
  - Value: `postgresql://localhost:5432/dummy` (실제 연결 안 함, 빌드만 통과)

## DB 연결 시 (나중에)

1. Neon(https://neon.tech) 무료 가입 → Connection string 복사
2. Netlify **Environment variables**에 `DATABASE_URL` 실제 값으로 교체
3. 재배포
4. 첫 접속 시 채용/식자재 페이지 열면 시드 데이터 자동 생성
