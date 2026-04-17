import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    department: '',
    consent: false
  });

  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const goToAuth = () => setCurrentPage(2);

  const goToTerms = () => {
    if (!formData.name || !formData.studentId || !formData.department) {
      alert("이름, 학번, 학과를 모두 입력해주세요.");
      return;
    }
    setCurrentPage(3);
  };

  const goBack = () => setCurrentPage(prev => prev - 1);

  const handleSubmit = () => {
    if (!formData.consent) {
      alert('서비스 이용 약관에 동의해주세요.');
      return;
    }
    
    // 데이터 전송 로직이 들어갈 자리 (현재는 바로 이동)
    console.log("저장될 데이터:", formData);
    window.location.href = 'https://open.kakao.com/o/gDVK0oqi';
  };

  return (
    <div className="app-container">
      
      {/* 1. 랜딩 페이지 */}
      {currentPage === 1 && (
        <div className="page text-center">
          <div className="logo-container">
            <img src="/logo.png" alt="같이타슈 로고" className="logo-img" onError={(e:any) => { e.target.src = 'https://via.placeholder.com/200x60.png?text=Logo+Here' }} />
          </div>
          <h2 className="subtitle">오늘 또 집에 안가게?</h2>
          <h1 className="main-title">
            막차 끊긴 밤,<br/>
            <span className="text-yellow-custom">안전하고 저렴하게</span><br/>
            귀가하세요.
          </h1>
          <p className="desc">
            유세인트로 신원이 확실하게 보증된 학우들과만 매칭됩니다.<br/>
            방향이 같은 사람끼리 모여 택시비를 1/N로 줄여보세요!
          </p>
          <div className="info-card-wrapper">
            <div className="info-card">
              <div className="emoji-icon">🎓</div>
              <h3 className="info-card-title">철저한 신원 인증</h3>
              <p className="info-card-desc">유세인트 인증을 통과한 실제 재학생만<br/>입장 가능합니다.</p>
            </div>
            <div className="info-card">
              <div className="emoji-icon">💸</div>
              <h3 className="info-card-title">가벼워진 교통비</h3>
              <p className="info-card-desc">비싼 심야 할증, 이제 동승원들과 1/N로<br/>깔끔하게 나누세요.</p>
            </div>
          </div>
          <div className="bottom-wrapper">
            <button onClick={goToAuth} className="btn-yellow">지금 무료로 참여하기</button>
            <p className="btn-helper">5/10 이후가 되면 유료로 전환돼요.</p>
          </div>
        </div>
      )}

      {/* 2. 인증 및 정보 입력 화면 */}
      {currentPage === 2 && (
        <div className="page flex-col-center">
          <div className="white-card text-center">
            <div className="emoji-large">🏫</div>
            <h2 className="auth-title">유세인트 인증</h2>
            <p className="auth-desc">안전한 동승을 위해 기본 정보를 입력해주세요.</p>
            <div className="form-container">
              <label className="form-label">이름 (본명)</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="홍길동" 
                className="form-input"
              />
              <label className="form-label">학번</label>
              <input 
                type="text" 
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="20241234" 
                className="form-input"
              />
              <label className="form-label">학과</label>
              <input 
                type="text" 
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="소프트웨어학부" 
                className="form-input mb-8-input"
              />
              <button onClick={goToTerms} className="btn-navy">인증하고 넘어가기</button>
            </div>
          </div>
          <button onClick={goBack} className="btn-back">이전으로 돌아가기</button>
        </div>
      )}

      {/* 3. 서비스 이용 동의 화면 */}
      {currentPage === 3 && (
        <div className="page flex-col-center">
          <div className="white-card">
            <h2 className="terms-title">서비스 이용 동의</h2>
            <div className="terms-box">
              <strong className="terms-box-title">[필수] 개인정보 수집 및 이용 동의</strong>
              본 서비스는 사용자 간 동승을 위한 창구를 마련해 줄 뿐 이로 인해 발생하는 모든 문제에 대해 책임지지 않음.<br/><br/>
              정산은 1/N을 적극 권장하나 사용자 간 합의로 변경 가능하되, 정산 관련 문제에 대해서도 책임지지 않음.<br/><br/>
              사고 발생 시 본사가 소지한 개인정보가 문제 해결을 위해 제공될 수 있음.
            </div>
            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="custom-checkbox"
              />
              <span className="checkbox-text">위 서비스 이용 약관에 동의합니다.</span>
            </label>
            <button onClick={handleSubmit} className="btn-submit">동의하고 시작하기</button>
          </div>
          <button onClick={goBack} className="btn-back">이전으로 돌아가기</button>
        </div>
      )}
      
    </div>
  );
}

export default App;
