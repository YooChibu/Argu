# Argu Admin Frontend

논쟁 플랫폼 관리자 프론트엔드 프로젝트입니다.

## 기술 스택

- **React** 18.2.0
- **React Router** 6.20.0
- **Vite** 5.0.8
- **Axios** 1.6.2
- **date-fns** 2.30.0

## 프로젝트 구조

```
src/
├── components/          # 컴포넌트
│   └── common/         # 공통 컴포넌트
│       ├── AdminLayout.jsx
│       ├── AdminLayout.css
│       └── ProtectedRoute.jsx
├── context/            # Context API
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/              # 페이지 컴포넌트
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── UsersPage.jsx
│   ├── ArguPage.jsx
│   ├── CommentsPage.jsx
│   ├── CategoriesPage.jsx
│   ├── ReportsPage.jsx
│   ├── StatisticsPage.jsx
│   ├── SettingsPage.jsx
│   └── AdminsPage.jsx
├── services/           # API 서비스
│   ├── api.js
│   ├── adminAuthService.js
│   ├── adminDashboardService.js
│   ├── adminUserService.js
│   ├── adminArguService.js
│   ├── adminCommentService.js
│   ├── adminCategoryService.js
│   ├── adminReportService.js
│   ├── adminStatisticsService.js
│   └── adminManagementService.js
├── styles/             # 스타일
│   └── index.css
├── App.jsx             # 메인 앱 컴포넌트
└── main.jsx            # 진입점
```

## 시작하기

### 설치

```bash
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

개발 서버는 `http://localhost:9102`에서 실행됩니다.

### 빌드

```bash
npm run build
# 또는
yarn build
```

## 환경 설정

백엔드 API 서버는 `http://localhost:9101`에서 실행되어야 합니다.

Vite 프록시 설정으로 `/api` 요청이 자동으로 백엔드 서버로 전달됩니다.

## 주요 기능

- 관리자 로그인/로그아웃
- 대시보드 (통계 및 최근 활동)
- 회원 관리
- 논쟁 관리
- 댓글 관리
- 카테고리 관리
- 신고 관리
- 통계 및 분석
- 시스템 설정
- 관리자 관리

## 라이센스

이 프로젝트는 Argu 플랫폼의 일부입니다.

