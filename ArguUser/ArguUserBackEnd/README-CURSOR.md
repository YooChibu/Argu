# Cursor AI에서 프로젝트 실행 가이드

## Cursor에서 실행 오류가 발생하는 이유

Cursor는 VS Code 기반이지만, Java 프로젝트 실행을 위해서는 추가 설정이 필요합니다.

### 주요 원인

1. **Gradle 프로젝트 인식 문제**
   - Cursor가 Gradle 프로젝트를 자동으로 인식하지 못할 수 있음
   - Java Language Server가 프로젝트를 제대로 로드하지 못함

2. **의존성 다운로드 문제**
   - Gradle 의존성이 다운로드되지 않음
   - 빌드가 완료되지 않아 실행 불가

3. **Java 확장 프로그램 미설치**
   - Java Language Support 확장 프로그램이 없음
   - Lombok 지원 확장 프로그램이 없음

## 해결 방법

### 1단계: 필수 확장 프로그램 설치

Cursor에서 다음 확장 프로그램을 설치하세요:

1. **Extension Pack for Java** (vscjava.vscode-java-pack)
2. **Lombok Annotations Support** (gabrielbb.vscode-lombok)
3. **Gradle for Java** (vscjava.vscode-gradle)

설치 방법:
- `Ctrl+Shift+X` → 확장 프로그램 검색 → 설치

### 2단계: Gradle 프로젝트 동기화

1. `Ctrl+Shift+P` (또는 `Cmd+Shift+P`)
2. "Java: Rebuild Projects" 입력 후 실행
3. 또는 "Java: Clean Java Language Server Workspace" 실행 후 Cursor 재시작

### 3단계: 의존성 다운로드

터미널에서 다음 명령어 실행:

```bash
gradlew.bat build --refresh-dependencies
```

### 4단계: 실행 방법

#### 방법 1: Gradle 명령어로 실행 (권장)

터미널에서:
```bash
gradlew.bat bootRun
```

#### 방법 2: 디버그 실행

1. `F5` 키 누르기
2. 또는 `Ctrl+Shift+D` → "Spring Boot - ArguUserApplication" 선택 → 실행

#### 방법 3: 메인 클래스에서 직접 실행

1. `ArguUserApplication.java` 파일 열기
2. `main` 메서드 위에 "Run" 또는 "Debug" 버튼 클릭

## 문제 해결 체크리스트

### ✅ 확인 사항

- [ ] Java 확장 프로그램 설치됨
- [ ] Lombok 확장 프로그램 설치됨
- [ ] Gradle 확장 프로그램 설치됨
- [ ] Java 17이 설치되어 있음
- [ ] MySQL 서버가 실행 중임
- [ ] `argu_db` 데이터베이스가 생성됨
- [ ] `argu_web` 사용자가 생성되고 권한이 부여됨

### 🔧 일반적인 오류 해결

#### 오류 1: "Cannot resolve symbol"
```bash
# Java Language Server 재시작
Ctrl+Shift+P → "Java: Clean Java Language Server Workspace"
# Cursor 재시작
```

#### 오류 2: "Gradle project not found"
```bash
# Gradle 프로젝트 동기화
gradlew.bat build
```

#### 오류 3: "Main class not found"
- `.vscode/launch.json` 파일 확인
- 메인 클래스 경로가 `com.argu.ArguUserApplication`인지 확인

#### 오류 4: "MySQL connection error"
- MySQL 서버 실행 확인
- `application.yml`의 DB 설정 확인
- 데이터베이스와 사용자 생성 확인

## 권장 실행 방법

가장 안정적인 실행 방법:

```bash
# 1. 프로젝트 빌드
gradlew.bat clean build

# 2. 애플리케이션 실행
gradlew.bat bootRun
```

또는 IntelliJ IDEA에서 실행하는 것을 권장합니다.



