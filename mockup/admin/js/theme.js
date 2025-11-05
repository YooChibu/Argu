// 관리자 사이트 테마 토글 기능
(function() {
    'use strict';

    // 테마 설정 키
    const THEME_KEY = 'argu-admin-theme';
    
    // 테마 초기화
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 저장된 테마가 있으면 사용, 없으면 시스템 설정 사용
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(theme);
    }

    // 테마 설정
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateToggleButton(theme);
    }

    // 토글 버튼 업데이트
    function updateToggleButton(theme) {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('svg use');
        if (icon) {
            icon.setAttribute('href', theme === 'dark' ? '#icon-sun' : '#icon-moon');
        }
        
        // 버튼 텍스트 업데이트
        const textSpan = toggleBtn.querySelector('.theme-toggle-text');
        if (textSpan) {
            textSpan.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
        }
    }

    // 테마 토글
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // 페이지 로드 시 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // 전역 함수로 노출
    window.toggleTheme = toggleTheme;
})();

