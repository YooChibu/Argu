# Gradle 마이그레이션 가이드

이 프로젝트는 Maven에서 Gradle로 마이그레이션되었습니다.

## Gradle Wrapper 설정

프로젝트를 처음 사용하시려면 Gradle Wrapper를 초기화해야 합니다.

### 방법 1: Gradle이 설치되어 있는 경우

```bash
gradle wrapper --gradle-version 8.5
```

### 방법 2: Gradle이 설치되어 있지 않은 경우

1. [Gradle 공식 사이트](https://gradle.org/install/)에서 Gradle을 다운로드하고 설치합니다.
2. 설치 후 위의 명령어를 실행합니다.

## 프로젝트 빌드 및 실행

### 빌드
```bash
# Windows
gradlew.bat build

# Linux/Mac
./gradlew build
```

### 애플리케이션 실행
```bash
# Windows
gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

### 테스트 실행
```bash
# Windows
gradlew.bat test

# Linux/Mac
./gradlew test
```

### 의존성 다운로드
```bash
# Windows
gradlew.bat dependencies

# Linux/Mac
./gradlew dependencies
```

## 주요 변경사항

- `pom.xml` → `build.gradle`로 변경
- Maven 의존성 → Gradle 의존성으로 변환
- 동일한 기능 유지 (Spring Boot, JPA, Security 등)

## IDE 설정

### IntelliJ IDEA
1. File → Open → `build.gradle` 선택
2. "Open as Project" 클릭
3. Gradle 프로젝트로 인식됨

### Eclipse
1. File → Import → Gradle → Existing Gradle Project
2. 프로젝트 디렉토리 선택

## 문제 해결

### Gradle Wrapper가 작동하지 않는 경우
```bash
gradle wrapper --gradle-version 8.5
```

### 빌드 오류가 발생하는 경우
```bash
# 캐시 정리
gradlew.bat clean build

# 또는
./gradlew clean build
```


