-- users 테이블에서 username 컬럼 제거 스크립트
-- 논쟁 플랫폼 데이터베이스 마이그레이션

USE argu_db;

-- 1. username 컬럼에 대한 인덱스가 있다면 먼저 제거
-- (인덱스가 없으면 에러가 발생하므로 IF EXISTS를 사용하거나 에러를 무시)
-- MySQL 5.7 이하 버전에서는 아래 쿼리를 실행하기 전에 인덱스 존재 여부를 확인해야 합니다.
-- MySQL 8.0 이상에서는 DROP INDEX IF EXISTS를 사용할 수 있습니다.

-- 인덱스 제거 (인덱스가 존재하는 경우)
DROP INDEX idx_username ON users;

-- 또는 MySQL 8.0 이상에서 안전하게 제거하려면:
-- DROP INDEX IF EXISTS idx_username ON users;

-- 2. username 컬럼 제거
ALTER TABLE users DROP COLUMN username;

-- 3. 변경 사항 확인
DESCRIBE users;

-- 4. 인덱스 확인
SHOW INDEX FROM users;

