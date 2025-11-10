/**
 * Button 컴포넌트
 * 
 * 재사용 가능한 버튼 컴포넌트입니다.
 * 
 * 주요 기능:
 * - 다양한 스타일 변형 지원 (primary, secondary, outline 등)
 * - 클릭 이벤트 처리
 * - 비활성화 상태 지원
 * - 커스텀 클래스명 추가 가능
 */

import './Button.css'

/**
 * Button 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 버튼 내부에 표시할 내용
 * @param {string} props.variant - 버튼 스타일 변형 ('primary', 'secondary', 'outline', 'danger' 등)
 * @param {Function} props.onClick - 버튼 클릭 시 실행할 함수
 * @param {string} props.type - 버튼 타입 ('button', 'submit', 'reset')
 * @param {boolean} props.disabled - 버튼 비활성화 여부
 * @param {string} props.className - 추가 CSS 클래스명
 * @param {Object} props.props - 기타 HTML button 속성들
 * @returns {JSX.Element} 버튼 컴포넌트
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  // CSS 클래스명 조합: 기본 btn 클래스 + variant 클래스 + 추가 클래스명
  const classes = `btn btn-${variant} ${className}`.trim()

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button








