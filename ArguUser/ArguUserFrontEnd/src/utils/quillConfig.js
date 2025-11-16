/**
 * Quill 에디터 설정 유틸리티
 * 
 * Quill 모듈을 한 번만 등록하여 중복 등록 경고를 방지합니다.
 */

import { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'

// 모듈이 이미 등록되었는지 확인하는 플래그
let imageResizeRegistered = false

/**
 * Quill 이미지 리사이즈 모듈 등록
 * 이미 등록된 경우 다시 등록하지 않습니다.
 */
export const registerQuillModules = () => {
  if (!imageResizeRegistered) {
    try {
      // Quill에 이미 등록되어 있는지 확인
      const existingModule = Quill.imports['modules/imageResize']
      if (!existingModule) {
        Quill.register('modules/imageResize', ImageResize)
      }
      imageResizeRegistered = true
    } catch (error) {
      // Overwriting 경고는 무시 (이미 등록된 경우)
      const errorMessage = error?.message || String(error)
      if (!errorMessage.includes('Overwriting')) {
        console.warn('이미지 리사이즈 모듈 등록 실패:', error)
      }
      // 에러가 발생해도 플래그는 true로 설정하여 재시도 방지
      imageResizeRegistered = true
    }
  }
}

