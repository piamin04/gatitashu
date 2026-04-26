import { useState } from 'react';
import './App.css';

const SMART_ID_LOGIN_URL = 'https://smartid.ssu.ac.kr/Symtra_sso/smln.asp';

const usaintLoginBaseUrl = (
  import.meta.env.VITE_USAINT_LOGIN_BASE_URL ?? 'http://localhost:8000'
).replace(/\/$/, '');

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    consent: false
  });

  const handleCheckboxChange = (e: any) => {
    setFormData({ consent: e.target.checked });
  };

  const handleAgreeAllChange = (e: any) => {
    setFormData({ consent: e.target.checked });
  };

  const goToTerms = () => setCurrentPage(2);

  const handleNextToAuth = () => {
    if (!formData.consent) {
      alert('서비스 이용 약관에 동의해주세요.');
      return;
    }
    // 약관 동의 완료 시 인증 페이지로 이동
    setCurrentPage(3);
  };

  const goToUsaintLogin = () => {
    const callbackPath = formData.consent
      ? '/auth/callback/consent-true'
      : '/auth/callback';
    const callbackUrl = `${usaintLoginBaseUrl}${callbackPath}`;
    const params = new URLSearchParams({
      apiReturnUrl: callbackUrl,
    });

    window.location.href = `${SMART_ID_LOGIN_URL}?${params.toString()}`;
  };

  const goBack = () => setCurrentPage(prev => prev - 1);

  return (
    <div className="app-container">
      
      {/* 1. 랜딩 페이지 */}
      {currentPage === 1 && (
        <div className="page text-center">
          <div className="logo-container">
            <img 
              src="/logo.png" 
              alt="같이타슈 로고" 
              className="logo-img" 
              onError={(e:any) => { e.target.src = 'https://via.placeholder.com/200x60.png?text=Logo+Here' }} 
            />
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
            <div className="urgency-badge">
              <span className="urgency-icon">🚨</span> 5/10 이후가 되면 유료로 전환돼요
            </div>
            
            {/* 무료로 참여하기 클릭 시 약관 페이지(Page 2)로 이동 */}
            <button onClick={goToTerms} className="btn-yellow">지금 무료로 참여하기</button>
          </div>
        </div>
      )}

      {/* 2. 서비스 이용 동의 화면 (새롭게 디자인된 레이아웃) */}
      {currentPage === 2 && (
        <div className="page page-no-padding">
          <div className="terms-header">
            <button onClick={goBack} className="btn-header-back">←</button>
            <h2 className="terms-header-title">약관동의</h2>
          </div>
          
          <div className="terms-content-wrapper">
            <label className="checkbox-wrapper-all">
              <input 
                type="checkbox" 
                checked={formData.consent}
                onChange={handleAgreeAllChange}
                className="custom-checkbox-all"
              />
              <span className="checkbox-text-all">약관에 전체동의</span>
            </label>

            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                checked={formData.consent}
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <span className="checkbox-text">(필수) 같이타슈 서비스 이용약관 및 개인정보 처리 동의</span>
            </label>

            {/* PDF의 내용을 토시 하나 바꾸지 않고 전문 수록 */}
            <div className="terms-box">
{`서비스 이용 동의

같이타슈 서비스 이용약관 및 개인정보 처리 동의

본 서비스(이하 '같이타슈')를 이용하고자 하는 귀하는 아래의 안내 사항을 충분히 숙지하였으며, 이에 동의하는 것으로 간주합니다.
본 서비스는 대학생 간 자율적인 정보 공유를 돕는 플랫폼으로, 운영진은 이용자 간의 거래 및 이동 과정에 일절 관여하지 않습니다.

1. 서비스의 목적 및 성격
'같이타슈'는 심야 시간대 동승을 원하는 대학생들을 연결해 주는 커뮤니티 및 정보 제공 서비스입니다.
• 운영진은 이용자 간의 동승 매칭을 직접 수행하거나 운송 서비스를 제공하지 않으며, 단순한 소통 창구(오픈채팅방 및 가이드)만을 제공합니다.
본 서비스는 이용자로부터 어떠한 금전적 대가나 중수수료를 받지 않는 비영리 목적의 단순 정보 매개 플랫폼입니다.

2. 책임의 한계 및 면책
• 운송 계약의 주체: 동승 과정에서 발생하는 운송 계약의 당사자는 '택시 운행 기사'와 '탑승객(이용자)'입니다. 운영진은 운송 계약의 당사자가 아닙니다.
사고 및 피해: 동승 중 발생한 교통사고, 범죄, 신체적·정신적 피해에 대하여 운영진은 어떠한 법적·도덕적 책임도 지지 않습니다.
• 금전 거래(정산): 택시비 정산은 이용자 간의 자율적인 약속입니다. 미송금, 금액 오류 등 정산 과정에서 발생하는 모든 금전적 분쟁에 대해 운영진은 개입하거나 보상하지 않습니다.
• 정산은 최종 목적지 하차자가 전액 결제 후 나머지 인원에게 청구하는 방식을 권장하며, 이용자는 하차 직후 송금 내역 및 영수증을 상호 확인해야 합니다.
서비스 중단: 시스템 오류, 오픈채팅방 폭파 등으로 인해 발생한 매칭 실패 및 이용자의 손해에 대해 운영진은 책임지지 않습니다.

3. 이용자의 의무 및 자발적 위험 부담
• 이용자는 본인의 판단과 책임하에 동승을 결정해야 합니다.
• 상대방의 신원(학번 등)을 직접 확인하는 등 안전을 위한 주의 의무는 이용자 본인에게 있습니다.
타인의 학번이나 연락처를 도용하여 가입하는 행위를 금지합니다.
서비스 이용 규칙(닉네임 설정, 매너 등) 위반 시 운영진에 의해 이용이 제한될 수 있으며, 이로 인해 발생하는 손해는 이용자의 책임입니다.
• 매칭 완료 후 정당한 사유 없이 약속 장소에 나타나지 않는 행위를 금지하며, 택시비 실비 외에 추가적인 수수료를 요구하거나 드라이버 역할을 하여 수익을 창출하는 행위를 일제히 금지합니다.

4. 개인정보 수집 및 제공에 관한 사항
수집 항목: 성명, 학번, 학과, (휴대전화 번호) 등.
이용목적: 이용자 신원 확인, 서비스 부정이용 방지, 분쟁 발생 시 근거 자료 보존
서비스는 이용자가 동의한 목적 범위 내에서만 개인정보를 이용하며, 이용자의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. (단, 제4조 3자 제공 항에 따른 법적 요구가 있을 경우는 예외로 함)
• 제3자 제공 : 동승 중 사고, 범죄, 정산 문제 등으로 인해 수사기관의 정식 요청이 있거나 법적 분쟁 해결이 필요한 경우, 운영진은 수집한 개인정보를 관련 기관 또는 피해 당사자에게 제공할 수 있습니다.
서비스 이용 종료 시 혹은 축제 기간 종료 후 3개월간 보관 (분쟁 해결 및 수사 협조 목적).
• 보유 기간 경과 후 복구 불가능한 방법으로 즉시 파기.

5. 분쟁 해결 및 관할
이용자 간의 분쟁은 당사자 간 합의로 해결하는 것을 원칙으로 합니다.
• 본 서비스 이용과 관련하여 운영진을 상대로 제기되는 모든 법적 소송의 관할은 운영진의 소재지 관할 법원으로 합니다.`}
            </div>
          </div>

          <button 
            onClick={handleNextToAuth} 
            className={`btn-submit-full ${formData.consent ? 'active' : ''}`}
          >
            동의하고 계속하기
          </button>
        </div>
      )}

      {/* 3. 인증 및 정보 입력 화면 */}
      {currentPage === 3 && (
        <div className="page flex-col-center">
          <div className="white-card text-center">
            <div className="emoji-large">🏫</div>
            <h2 className="auth-title">유세인트 인증</h2>
            <p className="auth-desc">
              아래 버튼을 눌러 유세인트 계정으로 로그인하세요.
              <br />
              로그인 완료 시 안전한 매칭을 위해 
              <br />
              학생 정보는 저장되며,
              <br />
              해당 정보는 서비스 목적 외에는 사용되지 않습니다.
            </p>
            <div className="form-container">
              <button onClick={goToUsaintLogin} className="btn-navy">
                유세인트 로그인하기
              </button>
            </div>
          </div>
          <button onClick={goBack} className="btn-back">이전으로 돌아가기</button>
        </div>
      )}
      
    </div>
  );
}

export default App;
