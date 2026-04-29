# gatitashu

같이타슈 프론트엔드입니다. 사용자는 랜딩 페이지, 약관 동의 화면, 유세인트 인증 화면을 순서대로 거치며, 인증 버튼을 누르면 숭실대 Smart ID 로그인으로 이동합니다.

## 인증 흐름

1. 사용자가 약관에 동의하면 프론트가 유세인트 인증 화면으로 이동합니다.
2. `유세인트 로그인하기` 버튼을 누르면 `https://smartid.ssu.ac.kr/Symtra_sso/smln.asp`로 이동합니다.
3. 이때 `apiReturnUrl` 파라미터에 인증 서버의 `/auth/callback/...` URL을 포함해 전달합니다.
4. 인증 성공 시 인증 서버가 학생 정보를 저장하고 완료 화면을 보여줍니다.
5. 인증 실패 시 인증 서버는 다시 이 프론트로 돌려보내며, `step=auth`, `consent=true`, `authError=...` 쿼리를 붙여 유세인트 인증 화면을 바로 다시 열어줍니다.

## 개발 실행

```bash
npm install
npm run dev
```

기본 개발 서버는 Vite를 사용합니다.

## 환경변수

- `VITE_USAINT_LOGIN_BASE_URL`: 유세인트 인증 서버의 베이스 URL. 프론트는 이 값을 기준으로 `/auth/callback/...` 콜백 URL을 생성합니다.

예시:

```bash
VITE_USAINT_LOGIN_BASE_URL=https://your-auth-server.example.com
```

설정하지 않으면 기본값으로 `http://localhost:8000`을 사용합니다.

## 빌드

```bash
npm run build
```
