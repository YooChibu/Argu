# 논쟁 사이트 (Argu) 관리자 사이트

논쟁(argu) 플랫폼 관리자 사이트 프로젝트입니다.

## 📋 목차

- [도메인 구조](#도메인-구조)
- [관리자 페이지 구조](#관리자-페이지-구조)
- [관리자 사이트맵](#관리자-사이트맵)
- [관리자 시스템](#관리자-시스템)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)

## 도메인 구조

관리자 사이트는 별도의 도메인으로 운영됩니다.

- **일반 사용자 사이트**: `https://argu.com` (또는 메인 도메인)
- **관리자 사이트**: `https://admin.argu.com` (또는 별도 관리자 도메인)

**예시 경로:**
- 관리자 로그인: `https://admin.argu.com/login`
- 관리자 대시보드: `https://admin.argu.com`
- 회원 관리: `https://admin.argu.com/users`
- 논쟁 관리: `https://admin.argu.com/argu`

관리자 사이트는 일반 사용자 사이트와 완전히 분리된 독립적인 프로젝트로 개발됩니다. 별도 도메인으로 운영되므로 경로에 `/admin` 접두사를 붙일 필요가 없습니다.

## 관리자 페이지 구조

### 핵심 페이지

1. **관리자 로그인** (`/login`)
   - 관리자 계정 로그인
   - 관리자 권한 확인

2. **관리자 대시보드** (`/`)
   - 전체 통계 요약
     - 전체 회원 수
     - 전체 논쟁 수
     - 오늘 작성된 논쟁 수
     - 오늘 가입한 회원 수
     - 활성 논쟁 수
     - 신고 건수 (미처리)
   - 최근 활동 내역
   - 인기 논쟁 TOP 5
   - 최근 가입 회원

3. **회원 관리** (`/users`)
   - 전체 회원 목록
   - 회원 검색 (이메일, 닉네임, 아이디)
   - 회원 상세 정보 조회
   - 회원 상태 관리 (정상, 정지, 탈퇴)
   - 회원 정지/해제
   - 회원 강제 탈퇴
   - 회원 활동 내역 조회

4. **논쟁 관리** (`/argu`)
   - 전체 논쟁 목록
   - 논쟁 검색 및 필터링
   - 논쟁 상세 정보 조회
   - 논쟁 수정/삭제
   - 논쟁 숨김 처리/해제
   - 논쟁 상태 관리 (예정, 진행중, 종료)
   - 논쟁 기간 수정

5. **댓글 관리** (`/comments`)
   - 전체 댓글 목록
   - 댓글 검색 및 필터링
   - 댓글 상세 정보 조회
   - 댓글 삭제
   - 댓글 숨김 처리/해제
   - 대댓글 관리

6. **카테고리 관리** (`/categories`)
   - 카테고리 목록
   - 카테고리 생성
   - 카테고리 수정
   - 카테고리 삭제
   - 카테고리 순서 조정

7. **신고 관리** (`/reports`)
   - 신고 목록 (미처리/처리완료)
   - 신고 상세 정보
   - 신고 처리 (승인/반려)
   - 신고 대상 내용 조회
   - 신고자 및 피신고자 정보

8. **통계 및 분석** (`/statistics`)
   - 회원 통계 (가입 추이, 활성 사용자 등)
   - 논쟁 통계 (작성 추이, 카테고리별 통계 등)
   - 댓글 통계
   - 활동 통계 (일별/주별/월별)
   - 다운로드 기능 (CSV, Excel)

9. **시스템 설정** (`/settings`)
   - 사이트 기본 설정
   - 이용 규칙 관리
   - 공지사항 관리
   - 이메일 템플릿 관리 (추후 작업 예정)

10. **관리자 관리** (`/admins`)
   - 관리자 계정 목록
   - 관리자 권한 설정 (슈퍼 관리자, 일반 관리자)
   - 권한별 기능 접근 제어
   - 관리자 계정 생성/수정/삭제
   - 권한 그룹 관리

## 관리자 사이트맵

```
/                             # 관리자 대시보드
├── /login                    # 관리자 로그인
├── /users                    # 회원 관리
│   └── /users/[id]           # 회원 상세
├── /argu                     # 논쟁 관리
│   ├── /argu/[id]            # 논쟁 상세
│   └── /argu/[id]/edit       # 논쟁 수정
├── /comments                 # 댓글 관리
│   └── /comments/[id]        # 댓글 상세
├── /categories               # 카테고리 관리
├── /reports                  # 신고 관리
│   └── /reports/[id]         # 신고 상세
├── /statistics               # 통계 및 분석
├── /settings                 # 시스템 설정
└── /admins                   # 관리자 관리
```

## 관리자 시스템

### 인증

1. **관리자 로그인** (`/login`)
   - 관리자 계정 ID/비밀번호 로그인
   - 관리자 권한 확인
   - 세션 관리

2. **관리자 관리**
   - 슈퍼 관리자 (모든 권한)
   - 일반 관리자 (제한된 권한)
   - 권한별 기능 접근 제어

### 관리 기능

3. **관리자 관리**
   - 관리자 계정 목록 조회
   - 관리자 권한 설정 (슈퍼 관리자, 일반 관리자)
   - 권한별 기능 접근 제어 설정
   - 관리자 계정 생성/수정/삭제
   - 권한 그룹 관리

4. **회원 관리**
   - 회원 목록 조회 및 검색
   - 회원 상세 정보 (작성한 논쟁, 댓글, 활동 내역)
   - 회원 상태 변경 (정상, 정지, 탈퇴)
   - 회원 정지 사유 및 기간 설정
   - 회원 강제 탈퇴

5. **논쟁 관리**
   - 논쟁 목록 조회 및 검색
   - 논쟁 상세 정보 및 통계
   - 논쟁 수정/삭제
   - 논쟁 숨김 처리 (블라인드)
   - 논쟁 상태 변경
   - 논쟁 기간 수정

6. **댓글 관리**
   - 댓글 목록 조회 및 검색
   - 댓글 상세 정보
   - 댓글 삭제
   - 댓글 숨김 처리 (블라인드)
   - 대댓글 관리

7. **카테고리 관리**
   - 카테고리 목록
   - 카테고리 생성/수정/삭제
   - 카테고리 순서 조정
   - 카테고리별 논쟁 수 통계

8. **신고 관리**
   - 신고 목록 조회 (미처리 우선)
   - 신고 상세 정보
   - 신고 대상 내용 확인
   - 신고 처리 (승인/반려)
   - 신고 처리 결과 기록

9. **통계 및 분석**
   - 회원 통계 (가입 추이, 활성 사용자, 지역별 통계 등)
   - 논쟁 통계 (작성 추이, 카테고리별, 인기 논쟁 등)
   - 댓글 통계
   - 활동 통계 (일별/주별/월별)
   - 데이터 다운로드 (CSV, Excel)

10. **시스템 설정**
   - 사이트 기본 정보 설정
   - 이용 규칙 관리
   - 공지사항 작성/수정/삭제
   - 이메일 템플릿 관리 (추후 작업 예정)

## 기술 스택

### 프론트엔드
- **React** - UI 라이브러리
- **React Router** - 클라이언트 사이드 라우팅
- **관리자 UI 라이브러리** - Ant Design, Material-UI 등 (선택)

### 백엔드
- **Java** - 프로그래밍 언어
- **Spring Boot** - 백엔드 프레임워크
- **JPA (Java Persistence API)** - ORM (Object-Relational Mapping)
- **Spring Security** - 인증 및 권한 관리 (관리자 권한)

### 데이터베이스
- **MySQL** - 관계형 데이터베이스
- **JPA Repository** - 데이터 접근 계층

### 인증
- **JWT** (JSON Web Tokens) - 토큰 기반 인증
- **Spring Security** - 관리자 인증 및 권한 관리
- **BCrypt** - 비밀번호 암호화

### 기타
- **차트 라이브러리** - Chart.js, Recharts 등 (통계 시각화)
- **데이터 다운로드** - CSV, Excel 변환

## 프로젝트 구조

### 프론트엔드 (React - 관리자)

```
admin-frontend/
├── src/
│   ├── pages/
│   │   ├── AdminLoginPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   ├── UserManagementPage.jsx
│   │   ├── UserDetailPage.jsx
│   │   ├── ArguManagementPage.jsx
│   │   ├── ArguDetailPage.jsx
│   │   ├── CommentManagementPage.jsx
│   │   ├── CategoryManagementPage.jsx
│   │   ├── ReportManagementPage.jsx
│   │   ├── ReportDetailPage.jsx
│   │   ├── StatisticsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── AdminManagementPage.jsx
│   │   └── ...
│   ├── components/
│   │   ├── common/            # 공통 컴포넌트
│   │   ├── admin/             # 관리자 전용 컴포넌트
│   │   ├── charts/            # 차트 컴포넌트
│   │   └── tables/            # 테이블 컴포넌트
│   ├── services/              # API 서비스
│   ├── utils/                 # 유틸리티 함수
│   ├── hooks/                 # 커스텀 훅
│   ├── context/               # Context API
│   ├── routes/
│   │   └── index.jsx          # 라우트 설정
│   └── App.jsx
├── public/
│   └── images/                # 정적 이미지
└── package.json
```

### 백엔드 (Spring Boot - 관리자)

```
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/argu/
│       │       ├── ArguApplication.java
│       │       ├── controller/
│       │       │   ├── admin/          # 관리자 컨트롤러
│       │       │   │   ├── AdminAuthController.java
│       │       │   │   ├── AdminUserController.java
│       │       │   │   ├── AdminArguController.java
│       │       │   │   ├── AdminCommentController.java
│       │       │   │   ├── AdminCategoryController.java
│       │       │   │   ├── AdminReportController.java
│       │       │   │   ├── AdminStatisticsController.java
│       │       │   │   ├── AdminSettingsController.java
│       │       │   │   └── AdminManagementController.java
│       │       │   └── ...
│       │       ├── service/
│       │       │   ├── admin/          # 관리자 서비스
│       │       │   │   ├── AdminUserService.java
│       │       │   │   ├── AdminArguService.java
│       │       │   │   ├── AdminCommentService.java
│       │       │   │   ├── AdminCategoryService.java
│       │       │   │   ├── AdminReportService.java
│       │       │   │   ├── AdminStatisticsService.java
│       │       │   │   └── AdminManagementService.java
│       │       │   └── ...
│       │       ├── repository/        # 데이터 접근 계층 (JPA Repository)
│       │       │   ├── UserRepository.java
│       │       │   ├── ArguRepository.java
│       │       │   ├── CommentRepository.java
│       │       │   ├── CategoryRepository.java
│       │       │   ├── ReportRepository.java
│       │       │   └── ...
│       │       ├── entity/
│       │       │   ├── User.java
│       │       │   ├── Argu.java
│       │       │   ├── Comment.java
│       │       │   ├── Category.java
│       │       │   ├── Report.java
│       │       │   ├── Admin.java
│       │       │   └── ...
│       │       ├── dto/
│       │       │   ├── admin/          # 관리자 DTO
│       │       │   └── ...
│       │       ├── config/
│       │       │   ├── SecurityConfig.java
│       │       │   ├── AdminSecurityConfig.java
│       │       │   └── ...
│       │       └── exception/
│       └── resources/
│           ├── application.yml
│           └── application-dev.yml
└── pom.xml (또는 build.gradle)
```

## 주요 기능

### 관리자 인증
- [ ] 관리자 로그인
- [ ] 관리자 권한 관리
- [ ] 세션 관리

### 관리자 관리
- [ ] 관리자 계정 목록 조회
- [ ] 관리자 권한 설정
- [ ] 권한별 기능 접근 제어
- [ ] 관리자 계정 생성/수정/삭제
- [ ] 권한 그룹 관리

### 회원 관리
- [ ] 회원 목록 조회 및 검색
- [ ] 회원 상세 정보 조회
- [ ] 회원 상태 관리 (정상, 정지, 탈퇴)
- [ ] 회원 정지/해제
- [ ] 회원 강제 탈퇴

### 논쟁 관리
- [ ] 논쟁 목록 조회 및 검색
- [ ] 논쟁 상세 정보 조회
- [ ] 논쟁 수정/삭제
- [ ] 논쟁 숨김 처리
- [ ] 논쟁 상태 관리

### 댓글 관리
- [ ] 댓글 목록 조회 및 검색
- [ ] 댓글 상세 정보 조회
- [ ] 댓글 삭제
- [ ] 댓글 숨김 처리
- [ ] 대댓글 관리

### 카테고리 관리
- [ ] 카테고리 목록
- [ ] 카테고리 생성/수정/삭제
- [ ] 카테고리 순서 조정

### 신고 관리
- [ ] 신고 목록 조회
- [ ] 신고 상세 정보 조회
- [ ] 신고 처리 (승인/반려)
- [ ] 신고 처리 결과 기록

### 통계 및 분석
- [ ] 회원 통계
- [ ] 논쟁 통계
- [ ] 댓글 통계
- [ ] 활동 통계
- [ ] 데이터 다운로드 (CSV, Excel)

### 시스템 설정
- [ ] 사이트 기본 설정
- [ ] 이용 규칙 관리
- [ ] 공지사항 관리
- [ ] 이메일 템플릿 관리 (추후 작업 예정)

## 개발 시작하기

관리자 사이트 개발을 시작하려면:

1. 관리자 프론트엔드 프로젝트 초기화
2. 관리자 백엔드 API 개발
3. 관리자 인증 및 권한 시스템 구현
4. 관리자 대시보드 구현
5. 각 관리 기능 페이지 구현

## 참고사항

### 도메인 및 배포
- 관리자 사이트는 별도의 도메인으로 운영됩니다.
- 일반 사용자 사이트와 완전히 분리된 독립적인 프로젝트입니다.
- 별도 도메인으로 배포하여 보안을 강화합니다.

### 기술적 고려사항
- 관리자 권한은 Spring Security를 통해 관리합니다.
- 관리자 API는 별도 도메인의 백엔드 서버에서 제공됩니다.
- 별도 도메인으로 운영되므로 경로에 `/admin` 접두사가 필요 없습니다.
- 일반 사용자 사이트와 동일한 데이터베이스를 공유할 수 있습니다.
- 관리자 로그는 별도로 기록하여 감사 추적이 가능하도록 구현합니다.

### 보안
- 관리자 사이트는 별도 도메인으로 운영하여 일반 사용자와의 접근을 분리합니다.
- 관리자 계정은 별도로 관리되며, 일반 회원 계정과 분리됩니다.

---

**마지막 업데이트**: 2025년

