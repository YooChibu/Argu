/**
 * 파일 업로드 서비스
 * 
 * 이미지 파일 업로드를 처리하는 서비스입니다.
 */

import api from './api'

export const fileUploadService = {
  /**
   * 이미지 파일 업로드
   * 
   * @param {File} file - 업로드할 이미지 파일
   * @returns {Promise<string>} 업로드된 이미지의 URL
   */
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('file', file)

    // 파일 업로드는 multipart/form-data를 사용
    // FormData를 사용하면 브라우저가 자동으로 Content-Type을 설정하므로
    // 수동으로 설정하지 않아야 합니다 (경계(boundary)가 자동으로 추가됨)
    // api.js의 인터셉터에서 FormData인 경우 Content-Type을 자동으로 제거합니다
    const response = await api.post('/upload/image', formData)

    // ApiResponse 구조에서 data 추출
    // response는 이미 api.js 인터셉터에서 처리된 ApiResponse 구조입니다
    // { success: boolean, message: string, data: string }
    if (response && typeof response === 'object' && 'data' in response) {
      return response.data // 이미지 URL (문자열)
    }
    // ApiResponse 구조가 아닌 경우 직접 반환
    return response
  },
}

