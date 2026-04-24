# gatitashu

같이타슈 프론트엔드입니다. 유세인트 인증 버튼을 누르면 별도 인증 서버의 `/login`으로 이동합니다.

## 실행

```bash
npm install
npm run dev
```

## 환경변수

- `VITE_USAINT_LOGIN_BASE_URL`: 유세인트 인증 서버 주소

예시:

```bash
VITE_USAINT_LOGIN_BASE_URL=https://your-auth-server.example.com
```
