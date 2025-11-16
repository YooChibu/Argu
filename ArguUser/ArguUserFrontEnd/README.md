# Argu User Frontend

논쟁 플랫폼 사용자 프론트엔드 프로젝트입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **React Router 6** - 클라이언트 사이드 라우팅
- **Vite** - 빌드 도구
- **Axios** - HTTP 클라이언트
- **date-fns** - 날짜 처리

## 시작하기

### 1단계: 의존성 설치 (필수)

프로젝트를 처음 실행하기 전에 반드시 의존성을 설치해야 합니다:

```bash
# npm 사용
npm install

# yarn 사용
yarn install
```

> **중요**: `node_modules` 폴더가 없으면 `yarn start` 또는 `npm start`가 작동하지 않습니다.

### 개발 서버 실행

```bash
# npm 사용
npm run dev
# 또는
npm start

# yarn 사용
yarn dev
# 또는
yarn start
# 또는 npx를 통해 사용 (PATH 문제 시)
npx yarn start
```

### yarn PATH 설정 (필요한 경우)

yarn이 인식되지 않는 경우, 다음 방법 중 하나를 사용하세요:

**방법 1: PATH 설정 스크립트 실행 (권장)**
```bash
# CMD에서
yarn-setup.bat

# PowerShell에서
.\yarn-setup.ps1
```

**방법 2: npx 사용**
```bash
npx yarn install
npx yarn start
```

**방법 3: 수동으로 PATH 추가 (영구적)**
1. Windows 검색에서 "환경 변수" 검색
2. "시스템 환경 변수 편집" 선택
3. "환경 변수" 버튼 클릭
4. "Path" 변수 선택 후 "편집"
5. `C:\Users\User\AppData\Roaming\npm` 추가
6. 모든 창 닫고 새 터미널 열기

개발 서버는 `http://localhost:9002`에서 실행됩니다.

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── argu/           # 논쟁 관련 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   └── user/           # 사용자 관련 컴포넌트
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스
├── context/            # Context API
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
├── styles/             # 전역 스타일
└── App.jsx            # 메인 앱 컴포넌트
```

## API 연동

백엔드 API는 `http://localhost:9001`에서 실행됩니다.
Vite 프록시 설정으로 `/api` 요청이 자동으로 백엔드로 전달됩니다.

## 주요 기능

- 회원가입/로그인
- 논쟁 목록 조회 및 검색
- 논쟁 상세 보기
- 논쟁 작성/수정/삭제
- 댓글 작성 및 대댓글
- 찬성/반대 투표
- 좋아요/북마크
- 마이페이지
- 다크모드 지원

