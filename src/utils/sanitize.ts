/**
 * 사용자 입력값의 XSS 방어 및 문자열 정제(Sanitization) 유틸리티
 */

/**
 * HTML 특수문자를 안전한 엔티티로 변환하고 위험한 스크립트 패턴을 제거합니다.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';

  return input
    // 불필요한 앞뒤 공백 제거
    .trim()
    // <script> 태그 및 이벤트 핸들러 등 위험한 태그 무력화
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // HTML 태그 괄호 및 특수문자 이스케이프
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * 화면 표기용 텍스트 정제 (React 기본 이스케이프와 호환되며 스크립트 실행 방지)
 * HTML 엔티티를 화면에 그대로 '&lt;'로 노출하지 않으면서도 스크립트 태그 실행을 방지
 */
export function cleanInputText(input: string): string {
  if (!input) return '';

  return input
    .trim()
    // script 태그와 스타일 태그 완전 제거
    .replace(/<\/?(script|style|iframe|object|embed)[^>]*>/gi, '')
    // javascript: 링크 무력화
    .replace(/javascript:/gi, 'blocked-javascript:');
}

/**
 * 빈 값 및 공백 전용 입력 검증
 */
export function isValidInput(input: string, minLength: number = 1): boolean {
  if (!input) return false;
  return input.trim().length >= minLength;
}
