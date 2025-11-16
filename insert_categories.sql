-- 논쟁 카테고리 입력 쿼리
-- Argu 플랫폼 카테고리 데이터 삽입 스크립트

-- 1. 단일 카테고리 입력 예시
INSERT INTO categories (name, description, order_num, created_at, updated_at) 
VALUES ('정치', '정치 관련 논쟁 주제', 1, NOW(), NOW());

-- 2. 여러 카테고리 일괄 입력
INSERT INTO categories (name, description, order_num, created_at, updated_at) VALUES
('정치', '정치, 선거, 정책 등 정치 관련 논쟁 주제', 1, NOW(), NOW()),
('경제', '경제, 금융, 부동산 등 경제 관련 논쟁 주제', 2, NOW(), NOW()),
('사회', '사회 이슈, 복지, 인권 등 사회 관련 논쟁 주제', 3, NOW(), NOW()),
('문화', '문화, 예술, 엔터테인먼트 등 문화 관련 논쟁 주제', 4, NOW(), NOW()),
('과학기술', '과학, 기술, IT 등 과학기술 관련 논쟁 주제', 5, NOW(), NOW()),
('교육', '교육 정책, 교육 시스템 등 교육 관련 논쟁 주제', 6, NOW(), NOW()),
('환경', '환경 보호, 기후 변화 등 환경 관련 논쟁 주제', 7, NOW(), NOW()),
('스포츠', '스포츠, 운동, 건강 등 스포츠 관련 논쟁 주제', 8, NOW(), NOW()),
('일상생활', '일상 생활, 취미, 관심사 등 일상 관련 논쟁 주제', 9, NOW(), NOW()),
('기타', '기타 다양한 주제의 논쟁', 10, NOW(), NOW());

-- 3. 설명 없이 카테고리만 입력하는 경우
INSERT INTO categories (name, order_num, created_at, updated_at) VALUES
('정치', 1, NOW(), NOW()),
('경제', 2, NOW(), NOW()),
('사회', 3, NOW(), NOW());

-- 4. 기존 데이터 확인
SELECT * FROM categories ORDER BY order_num, id;

-- 5. 카테고리 수정 예시
-- UPDATE categories 
-- SET description = '수정된 설명', order_num = 1 
-- WHERE id = 1;

-- 6. 카테고리 삭제 예시 (주의: 해당 카테고리를 사용하는 논쟁이 있으면 삭제 불가)
-- DELETE FROM categories WHERE id = 1;

-- 7. 카테고리 중복 확인 (name은 UNIQUE 제약조건이 있으므로 중복 불가)
-- INSERT INTO categories (name, description, order_num) 
-- VALUES ('정치', '중복된 카테고리', 1);
-- 위 쿼리는 에러 발생 (Duplicate entry '정치' for key 'categories.name')

-- 8. 카테고리 순서 재정렬 예시
-- UPDATE categories SET order_num = 1 WHERE name = '정치';
-- UPDATE categories SET order_num = 2 WHERE name = '경제';
-- UPDATE categories SET order_num = 3 WHERE name = '사회';

