import React, { useState } from 'react';

// 공공데이터/GPS 연동 전 임시로 보여줄 가짜(더미) 추천 장소 틀
const dummyPlaces = [
  { id: 1, name: '추천 장소 1 (GPS 기반 자동 추천)', category: 'nature', desc: '현재 GPS 위치와 혼잡도 데이터를 분석하여 추천된 장소입니다.', distance: '350m', crowd: '여유' },
  { id: 2, name: '추천 장소 2 (GPS 기반 자동 추천)', category: 'indoor', desc: '현재 날씨(비/맑음) 조건에 맞춰 자동 선택된 실내/야외 공간입니다.', distance: '1.2km', crowd: '보통' },
  { id: 3, name: '추천 장소 3 (GPS 기반 자동 추천)', category: 'food', desc: '주변 유동인구 및 리뷰 데이터 기반 추천 음식점/카페입니다.', distance: '800m', crowd: '혼잡' },
];

export default function App() {
  // 화면 단계: 'auth' -> 'gps_loading' -> 'preferences' -> 'main'
  const [step, setStep] = useState('auth');
  const [authMode, setAuthMode] = useState('login');

  // GPS로 자동 인식될 위치/날씨 (임시 값)
  const [currentLocation, setCurrentLocation] = useState('GPS 위치 탐색 완료 (제주시 연동)');
  const [weather, setWeather] = useState('맑음');

  // 사용자 선택값
  const [companion, setCompanion] = useState('alone');
  const [transport, setTransport] = useState('public');
  const [activeCategory, setActiveCategory] = useState('all');

  // 1. 로그인 완료 -> GPS 감지 단계로 이동
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setStep('gps_loading');
  };

  // 2. GPS 위치 확인 완료 -> 취향 선택으로 이동
  const handleGpsConfirm = () => {
    setStep('preferences');
  };

  // 3. 취향 선택 완료 -> 메인 추천 화면으로 이동
  const handlePreferencesSubmit = () => {
    setStep('main');
  };

  // 카테고리 필터링
  const filteredPlaces = activeCategory === 'all'
    ? dummyPlaces
    : dummyPlaces.filter(p => p.category === activeCategory);

  return (
    <div style={styles.mobileContainer}>

      {/* 1단계: 로그인 / 회원가입 */}
      {step === 'auth' && (
        <div style={styles.stepBox}>
          <h2 style={styles.stepTitle}>제주 즉흥 여행 ✈️</h2>
          <p style={styles.stepSubtitle}>{authMode === 'login' ? '로그인해 주세요' : '회원가입'}</p>
          
          <form onSubmit={handleAuthSubmit} style={styles.form}>
            <input type="email" placeholder="이메일 주소" required style={styles.input} />
            <input type="password" placeholder="비밀번호" required style={styles.input} />
            {authMode === 'signup' && (
              <input type="text" placeholder="닉네임" required style={styles.input} />
            )}
            <button type="submit" style={styles.primaryBtn}>
              {authMode === 'login' ? '로그인하고 시작하기' : '가입 완료하기'}
            </button>
          </form>

          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            style={styles.switchBtn}
          >
            {authMode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </div>
      )}

      {/* 2단계: GPS 기반 자동 위치 감지 안내 화면 */}
      {step === 'gps_loading' && (
        <div style={styles.stepBox}>
          <h2 style={styles.stepTitle}>📡 위치 자동 감지</h2>
          <p style={styles.stepSubtitle}>현재 GPS 및 날씨 정보를 불러왔습니다.</p>

          <div style={styles.infoCard}>
            <div style={styles.infoRow}>
              <span>📍 현재 위치:</span>
              <strong>{currentLocation}</strong>
            </div>
            <div style={styles.infoRow}>
              <span>☀️ 현재 날씨:</span>
              <strong>제주 21°C (맑음)</strong>
            </div>
          </div>

          <p style={styles.hintText}>* 나중에 실제 GPS와 센터 데이터(유동인구, 날씨)가 이곳에 자동으로 연결됩니다.</p>

          <button onClick={handleGpsConfirm} style={styles.primaryBtn}>
            내 위치로 추천받기
          </button>
        </div>
      )}

      {/* 3단계: 맞춤 추천 옵션 선택 */}
      {step === 'preferences' && (
        <div style={styles.stepBox}>
          <h2 style={styles.stepTitle}>🎯 즉흥 여행 옵션</h2>
          <p style={styles.stepSubtitle}>원하시는 조건만 가볍게 선택해 주세요!</p>

          <label style={styles.label}>누구와 함께 있나요?</label>
          <div style={styles.gridGroup}>
            {[
              { id: 'alone', label: '🧑 혼자' },
              { id: 'couple', label: '👩‍❤️‍👨 연인' },
              { id: 'friends', label: '🧑‍🤝‍🧑 친구' },
              { id: 'family', label: '👨‍👩‍👧‍👦 가족' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCompanion(item.id)}
                style={{
                  ...styles.gridBtn,
                  backgroundColor: companion === item.id ? '#0284c7' : '#f1f5f9',
                  color: companion === item.id ? '#fff' : '#334155'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label style={styles.label}>이동 수단</label>
          <div style={styles.buttonGroup}>
            {[
              { id: 'public', label: '🚌 대중교통' },
              { id: 'walk', label: '🏃 도보' },
              { id: 'car', label: '🚗 렌트카/자차' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTransport(item.id)}
                style={{
                  ...styles.choiceBtn,
                  backgroundColor: transport === item.id ? '#0284c7' : '#f1f5f9',
                  color: transport === item.id ? '#fff' : '#334155'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button onClick={handlePreferencesSubmit} style={styles.primaryBtn}>
            맞춤 추천 장소 보기 ✨
          </button>
        </div>
      )}

      {/* 4단계: 메인 홈 화면 (UI 틀 및 임시 카드) */}
      {step === 'main' && (
        <>
          <header style={styles.header}>
            <div style={styles.topInfo}>
              <span style={styles.locBadge}>📡 GPS 연결됨</span>
              <span style={styles.weatherBadge}>☀️ 맑음</span>
            </div>
            <h1 style={styles.title}>내 주변 즉흥 추천 ✈️</h1>
            <button onClick={() => setStep('preferences')} style={styles.resetBtn}>옵션 다시 선택</button>
          </header>

          {/* 카테고리 필터 버튼 */}
          <div style={styles.categoryContainer}>
            <button 
              onClick={() => setActiveCategory('all')} 
              style={{ ...styles.catButton, backgroundColor: activeCategory === 'all' ? '#0284c7' : '#e2e8f0', color: activeCategory === 'all' ? '#fff' : '#334155' }}
            >
              전체
            </button>
            <button 
              onClick={() => setActiveCategory('nature')} 
              style={{ ...styles.catButton, backgroundColor: activeCategory === 'nature' ? '#0284c7' : '#e2e8f0', color: activeCategory === 'nature' ? '#fff' : '#334155' }}
            >
              🌲 자연/오름
            </button>
            <button 
              onClick={() => setActiveCategory('indoor')} 
              style={{ ...styles.catButton, backgroundColor: activeCategory === 'indoor' ? '#0284c7' : '#e2e8f0', color: activeCategory === 'indoor' ? '#fff' : '#334155' }}
            >
              🏛️ 실내/문화
            </button>
            <button 
              onClick={() => setActiveCategory('food')} 
              style={{ ...styles.catButton, backgroundColor: activeCategory === 'food' ? '#0284c7' : '#e2e8f0', color: activeCategory === 'food' ? '#fff' : '#334155' }}
            >
              🍚 맛집/카페
            </button>
          </div>

          {/* 추천 장소 틀 (카드 리스트) */}
          <div style={styles.listContainer}>
            {filteredPlaces.map(place => (
              <div key={place.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.placeName}>{place.name}</h3>
                  <span style={styles.crowdBadge}>혼잡도: {place.crowd}</span>
                </div>
                <p style={styles.placeDesc}>{place.desc}</p>
                <div style={styles.cardFooter}>
                  <span>📍 반경 {place.distance} 이내</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

// 스타일 디자인
const styles = {
  mobileContainer: {
    maxWidth: '430px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  stepBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '40px',
  },
  stepTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: 0,
  },
  stepSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 10px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#334155',
  },
  hintText: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: '1.4',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    marginTop: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  gridGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  choiceBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  gridBtn: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  primaryBtn: {
    marginTop: '15px',
    padding: '14px',
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  switchBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  header: {
    marginBottom: '20px',
  },
  topInfo: {
    display: 'flex',
    gap: '6px',
    marginBottom: '8px',
  },
  locBadge: {
    fontSize: '12px',
    backgroundColor: '#e2e8f0',
    padding: '4px 8px',
    borderRadius: '6px',
    color: '#334155',
  },
  weatherBadge: {
    fontSize: '12px',
    backgroundColor: '#e0f2fe',
    padding: '4px 8px',
    borderRadius: '6px',
    color: '#0369a1',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: 0,
  },
  resetBtn: {
    marginTop: '6px',
    padding: '4px 8px',
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    fontSize: '11px',
    color: '#64748b',
    cursor: 'pointer',
  },
  categoryContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    overflowX: 'auto',
  },
  catButton: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  placeName: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
  },
  crowdBadge: {
    fontSize: '11px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    padding: '3px 8px',
    borderRadius: '6px',
    fontWeight: '600',
  },
  placeDesc: {
    fontSize: '13px',
    color: '#475569',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
  },
  cardFooter: {
    fontSize: '11px',
    color: '#94a3b8',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '8px',
  },
};