# 논쟁 사이트 (Argu) 프로젝트

논쟁(argu) 플랫폼 프로젝트입니다.

## 📋 목차

- [페이지 구조](#페이지-구조)
- [사이트맵](#사이트맵)
- [회원 시스템](#회원-시스템)
- [기술 스택 제안](#기술-스택-제안)
- [프로젝트 구조](#프로젝트-구조)

## 페이지 구조

### 핵심 페이지

1. **메인페이지** (`/`)
   - 검색 기능
   - 인기 논쟁, 최신 논쟁, 카테고리별 미리보기
   - 랭킹 (인기 논쟁, 인기 사용자 등)
   - 주요 기능 바로가기

2. **논쟁 목록** (`/argu`)
   - 전체 논쟁 목록
   - 필터링 (카테고리, 날짜, 인기순 등)
   - 정렬 옵션

3. **논쟁 상세** (`/argu/[id]`)
   - 논쟁 주제 및 내용
   - 찬성/반대 의견
   - 댓글 시스템 (댓글의 댓글 작성 가능, 댓글 신고 기능)
   - 실시간 채팅 (논쟁별 채팅방) - 논쟁 기간 동안만 가능
   - 투표 기능 (찬성/반대) - 논쟁 기간 동안만 가능
   - 좋아요/북마크
   - 논쟁 기간 표시 및 상태 (진행중/종료)
   - 논쟁 수정/삭제 (작성자만 가능, 논쟁 시작 전까지만 가능)
   - 논쟁 신고 기능

4. **논쟁 작성** (`/argu/create`)
   - 새 논쟁 생성
   - 카테고리 선택
   - 찬성/반대 입장 명시
   - 논쟁 기간 설정 (시작일시 ~ 종료일시)

5. **논쟁 수정** (`/argu/[id]/edit`)
   - 작성한 논쟁 수정 (작성자만 가능)
   - 제목, 내용, 카테고리 수정
   - 찬성/반대 입장 수정
   - 논쟁 기간 수정 (논쟁 시작 전까지만 가능)

6. **논쟁 삭제**
   - 작성한 논쟁 삭제 (작성자만 가능, 논쟁 시작 전까지만 가능)
   - 삭제 확인 후 처리
   - 삭제된 논쟁은 목록에서 제외

7. **검색** (`/search`)
   - 키워드 검색
   - 고급 검색 옵션

8. **카테고리 목록** (`/categories`)
   - 전체 카테고리 목록
   - 카테고리별 논쟁 수 표시

9. **카테고리별 논쟁** (`/categories/[category]`)
   - 카테고리별 논쟁 목록
   - 카테고리 정보

10. **사용자 마이페이지** (`/users/[username]`)
    - 다른 사용자의 마이페이지
    - 프로필 정보 조회
    - 작성한 논쟁 목록
    - 참여한 논쟁 목록
    - 사용자 신고 기능

11. **신고 기능**
    - 논쟁 신고: 논쟁 상세 페이지에서 신고 가능
    - 댓글 신고: 각 댓글에 신고 버튼 제공
    - 사용자 신고: 사용자 프로필 페이지에서 신고 가능
    - 신고 사유 선택 및 상세 설명 입력
    - 신고 제출 후 관리자 검토 대기
    - 신고 처리 결과 확인 (선택사항)

### 보조 페이지

- `/about` - 사이트 소개
- `/rules` - 이용 규칙 및 가이드라인

## 사이트맵

```
/                              # 메인페이지
├── /argu                      # 논쟁 목록
│   ├── /argu/create           # 논쟁 작성
│   ├── /argu/[id]             # 논쟁 상세
│   └── /argu/[id]/edit        # 논쟁 수정
├── /search                    # 검색
├── /categories                # 카테고리 목록
│   └── /categories/[category] # 카테고리별 논쟁
├── /auth                      # 인증
│   ├── /auth/login            # 로그인
│   ├── /auth/register         # 회원가입
│   ├── /auth/forgot-password  # 비밀번호 찾기
│   ├── /auth/reset-password   # 비밀번호 재설정
│   └── /auth/verify-email     # 이메일 인증
├── /my                        # 마이페이지
│   ├── /my/edit               # 프로필 수정
│   ├── /my/settings           # 계정 설정
│   └── /my/activity           # 활동 내역
├── /users/[username]          # 다른 사용자 마이페이지
├── /about                     # 소개
└── /rules                     # 이용 규칙
```

## 회원 시스템

### 인증 관련 페이지

1. **회원가입** (`/auth/register`)
   - 이메일/아이디 입력
   - 비밀번호 설정
   - 닉네임 설정
   - 약관 동의
   - 이메일 인증 (추후 작업 예정)

2. **로그인** (`/auth/login`)
   - 이메일/아이디 + 비밀번호 로그인
   - 소셜 로그인 (구글, 카카오 등) (추후 작업 예정)
   - "아이디/비밀번호 찾기" 링크
   - "회원가입" 링크

3. **비밀번호 찾기** (`/auth/forgot-password`)
   - 이메일 입력
   - 재설정 링크 이메일 발송 (추후 작업 예정)

4. **비밀번호 재설정** (`/auth/reset-password`)
   - 토큰 기반 재설정 페이지
   - 새 비밀번호 입력

5. **이메일 인증** (`/auth/verify-email`)
   - 회원가입 후 이메일 인증 처리 (추후 작업 예정)

### 마이페이지 관련

6. **마이페이지** (`/my`)
   - 대시보드: 내 활동 요약
     - 내가 작성한 논쟁 수
     - 내가 참여한 논쟁 수 (댓글/투표)
     - 받은 좋아요 수
     - 내 인기 논쟁 TOP 3
     - 최근 활동 내역
   - 프로필 정보 조회
   - 내가 작성한 논쟁 목록
   - 내가 참여한 논쟁 목록 (찬성/반대 표시 포함)
   - 내가 작성한 댓글 목록 (댓글 및 대댓글, 해당 논쟁 제목 표시)
   - 내가 좋아요/북마크한 논쟁

7. **프로필 수정** (`/my/edit`)
   - 닉네임 변경
   - 프로필 이미지 업로드/변경
   - 소개글 작성/수정
   - 비밀번호 변경

8. **계정 설정** (`/my/settings`)
   - 알림 설정 (추후 작업 예정)
   - 개인정보 설정 (추후 작업 예정)
   - 계정 탈퇴

9. **활동 내역** (`/my/activity`)
   - 작성한 논쟁 목록
   - 작성한 댓글 목록 (해당 논쟁 제목 표시)
   - 투표 이력 (찬성/반대 표시 포함)
   - 통계 (참여한 논쟁 수, 받은 좋아요 등)

## 기술 스택

### 프론트엔드
- **React** - UI 라이브러리
- **React Router** - 클라이언트 사이드 라우팅

### 백엔드
- **Java** - 프로그래밍 언어
- **Spring Boot** - 백엔드 프레임워크
- **JPA (Java Persistence API)** - ORM (Object-Relational Mapping)

### 데이터베이스
- **MySQL** - 관계형 데이터베이스
- **JPA Repository** - 데이터 접근 계층

### 인증
- **JWT** (JSON Web Tokens) - 토큰 기반 인증
- **Spring Security** - 인증 및 권한 관리
- **BCrypt** - 비밀번호 암호화
- **OAuth** - 소셜 로그인 (추후 작업 예정)

### 실시간 통신
- **WebSocket** - 실시간 양방향 통신
- **Spring WebSocket** 또는 **Socket.IO** - 서버 측 WebSocket 지원

### 기타
- **이메일 서비스** - 추후 작업 예정
- **파일 업로드** - 추후 결정 (AWS S3, Cloudinary 등)
- **검색** - 추후 결정 (Elasticsearch 등)

## 프로젝트 구조

### 프론트엔드 (React)

```
frontend/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ArguListPage.jsx
│   │   ├── ArguDetailPage.jsx
│   │   ├── CreateArguPage.jsx
│   │   ├── EditArguPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── MyPage.jsx
│   │   └── ...
│   ├── components/
│   │   ├── common/            # 공통 컴포넌트
│   │   ├── argu/              # 논쟁 관련 컴포넌트
│   │   ├── auth/              # 인증 관련 컴포넌트
│   │   ├── user/              # 사용자 관련 컴포넌트
│   │   └── report/            # 신고 관련 컴포넌트
│   │       ├── ReportModal.jsx # 신고 모달
│   │       └── ReportButton.jsx # 신고 버튼
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

### 백엔드 (Spring Boot)

```
backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/argu/
│       │       ├── ArguApplication.java
│       │       ├── controller/       # REST 컨트롤러
│       │       │   ├── AuthController.java
│       │       │   ├── ArguController.java
│       │       │   ├── UserController.java
│       │       │   ├── CommentController.java
│       │       │   ├── CategoryController.java
│       │       │   ├── ReportController.java
│       │       │   ├── ChatController.java
│       │       │   └── ...
│       │       ├── service/          # 비즈니스 로직
│       │       │   ├── AuthService.java
│       │       │   ├── ArguService.java
│       │       │   ├── CommentService.java
│       │       │   ├── CategoryService.java
│       │       │   ├── ReportService.java
│       │       │   ├── ChatService.java
│       │       │   └── ...
│       │       ├── repository/      # 데이터 접근 계층 (JPA Repository)
│       │       │   ├── UserRepository.java
│       │       │   ├── ArguRepository.java
│       │       │   ├── CommentRepository.java
│       │       │   ├── CategoryRepository.java
│       │       │   ├── ArguOpinionRepository.java
│       │       │   ├── LikeRepository.java
│       │       │   ├── BookmarkRepository.java
│       │       │   ├── ChatMessageRepository.java
│       │       │   ├── ReportRepository.java
│       │       │   └── ...
│       │       ├── entity/          # 엔티티 클래스
│       │       │   ├── User.java
│       │       │   ├── Argu.java
│       │       │   ├── Comment.java
│       │       │   ├── Category.java
│       │       │   ├── ArguOpinion.java
│       │       │   ├── Like.java
│       │       │   ├── Bookmark.java
│       │       │   ├── ChatMessage.java
│       │       │   ├── Report.java
│       │       │   └── ...
│       │       ├── dto/             # 데이터 전송 객체
│       │       ├── config/          # 설정 클래스
│       │       │   ├── SecurityConfig.java
│       │       │   └── ...
│       │       └── exception/       # 예외 처리
│       └── resources/
│           ├── application.yml      # 애플리케이션 설정
│           └── application-dev.yml # 개발 환경 설정
└── pom.xml (또는 build.gradle)
```

## 주요 기능

### 논쟁 기능
- [ ] 논쟁 작성
- [ ] 논쟁 기간 설정 (시작일시 ~ 종료일시)
- [ ] 논쟁 수정 (작성자만 가능, 논쟁 시작 전까지만 가능)
- [ ] 논쟁 삭제 (작성자만 가능, 논쟁 시작 전까지만 가능)
- [ ] 찬성/반대 의견 작성
- [ ] 댓글 시스템 (대댓글 작성 가능)
- [ ] 실시간 채팅 (논쟁별 채팅방) - 기간 동안만 가능
- [ ] 투표 기능 (찬성/반대) - 기간 동안만 가능
- [ ] 논쟁 상태 관리 (예정/진행중/종료)
- [ ] 좋아요/북마크
- [ ] 카테고리 분류
- [ ] 검색 기능
- [ ] 정렬 및 필터링
- [ ] 논쟁 신고 기능

### 회원 기능
- [ ] 회원가입
- [ ] 로그인/로그아웃
- [ ] 소셜 로그인 (추후 작업 예정)
- [ ] 프로필 관리
- [ ] 비밀번호 재설정
- [ ] 이메일 인증 (추후 작업 예정)
- [ ] 활동 내역 조회

### 신고 기능
- [ ] 논쟁 신고 (논쟁 상세 페이지)
- [ ] 댓글 신고 (각 댓글에 신고 버튼)
- [ ] 사용자 신고 (사용자 프로필 페이지)
- [ ] 신고 사유 선택 및 상세 설명 입력
- [ ] 신고 제출 및 관리자 검토 대기
- [ ] 신고 처리 결과 확인 (선택사항)

### 기타 기능
- [ ] 메인페이지 검색 기능
- [ ] 랭킹 시스템 (인기 논쟁, 인기 사용자 등)
- [ ] 반응형 디자인
- [ ] 다크 모드 (선택)
- [ ] 알림 시스템
- [ ] 관리자 기능 (선택)

## 개발 시작하기

프로젝트 초기 설정 및 개발을 시작하려면:

1. 원하는 기술 스택 선택
2. 프로젝트 초기화
3. 필요한 패키지 설치
4. 데이터베이스 설정
5. 기본 페이지 및 컴포넌트 생성

---

**마지막 업데이트**: 2025년

