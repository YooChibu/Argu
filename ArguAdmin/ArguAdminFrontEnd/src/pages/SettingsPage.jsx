/**
 * 시스템 설정 페이지
 * 
 * 사이트 기본 설정, 이용 규칙 관리, 공지사항 관리 등의 기능을 제공합니다.
 */

import { useState } from 'react'
import './SettingsPage.css'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    siteName: 'Argu',
    siteDescription: '논쟁 플랫폼',
    maintenanceMode: false
  })
  const [rules, setRules] = useState({
    content: ''
  })
  const [notice, setNotice] = useState({
    title: '',
    content: '',
    isActive: false
  })

  const handleSettingsSave = () => {
    // TODO: 백엔드 API 연동
    alert('설정이 저장되었습니다. (백엔드 API 연동 필요)')
  }

  const handleRulesSave = () => {
    // TODO: 백엔드 API 연동
    alert('이용 규칙이 저장되었습니다. (백엔드 API 연동 필요)')
  }

  const handleNoticeSave = () => {
    // TODO: 백엔드 API 연동
    alert('공지사항이 저장되었습니다. (백엔드 API 연동 필요)')
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>시스템 설정</h1>
      </div>

      {/* 탭 메뉴 */}
      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          기본 설정
        </button>
        <button
          className={`tab-button ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          이용 규칙
        </button>
        <button
          className={`tab-button ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          공지사항
        </button>
      </div>

      {/* 기본 설정 탭 */}
      {activeTab === 'general' && (
        <div className="content-card">
          <h3>사이트 기본 설정</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>사이트 이름</label>
              <input
                type="text"
                className="form-input"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                placeholder="사이트 이름"
              />
            </div>
            <div className="form-group">
              <label>사이트 설명</label>
              <textarea
                className="form-textarea"
                rows="4"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                placeholder="사이트 설명"
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    setSettings({ ...settings, maintenanceMode: e.target.checked })
                  }
                />
                <span>점검 모드 활성화</span>
              </label>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSettingsSave}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 이용 규칙 탭 */}
      {activeTab === 'rules' && (
        <div className="content-card">
          <h3>이용 규칙 관리</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>이용 규칙 내용</label>
              <textarea
                className="form-textarea"
                rows="20"
                value={rules.content}
                onChange={(e) => setRules({ ...rules, content: e.target.value })}
                placeholder="이용 규칙을 입력하세요..."
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleRulesSave}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 공지사항 탭 */}
      {activeTab === 'notice' && (
        <div className="content-card">
          <h3>공지사항 관리</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>공지사항 제목</label>
              <input
                type="text"
                className="form-input"
                value={notice.title}
                onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                placeholder="공지사항 제목"
              />
            </div>
            <div className="form-group">
              <label>공지사항 내용</label>
              <textarea
                className="form-textarea"
                rows="15"
                value={notice.content}
                onChange={(e) => setNotice({ ...notice, content: e.target.value })}
                placeholder="공지사항 내용"
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notice.isActive}
                  onChange={(e) =>
                    setNotice({ ...notice, isActive: e.target.checked })
                  }
                />
                <span>공지사항 활성화</span>
              </label>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleNoticeSave}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 안내 메시지 */}
      <div className="info-box">
        <p>
          <strong>참고:</strong> 이 페이지의 기능들은 백엔드 API 연동이 필요합니다.
          현재는 UI만 제공되며, 실제 저장 기능은 백엔드 개발 후 연동해야 합니다.
        </p>
      </div>
    </div>
  )
}

export default SettingsPage
