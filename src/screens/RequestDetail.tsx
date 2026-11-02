import { useEffect, useRef } from 'react';
import { asset, Button } from '../components/Common';
import { AppHeader } from '../components/AppHeader';
import { NeedToggle } from '../components/NeedToggle';

export function RequestDetail({
  back,
  needed,
  toggleNeeded,
  action,
  locked,
  offer,
}: {
  back: () => void;
  needed: boolean;
  toggleNeeded: () => void;
  action: (title: string) => void;
  locked: boolean;
  offer: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section className="request-detail" aria-label="이웃의 부탁 상세">
      <AppHeader title="이웃의 부탁" onBack={back} />
      <div className={`request-detail-scroll${locked ? ' screen-locked' : ''}`}>
        <div className="request-detail-body">
          <h1 ref={heading} tabIndex={-1}>
            문화강좌 신청 좀<br />
            도와주실 분 계세요?
          </h1>
          <div className="request-detail-profile">
            <img src={asset('c5f53.png')} alt="" width="40" height="40" />
            <div>
              <strong>정숙 이웃</strong>
              <p>연남동 · 오늘 오전 9:50</p>
            </div>
          </div>
          <div className="request-detail-description">
            <p>수채화를 배우고 싶어서 구청 홈페이지에 들어갔는데, 신청하는 곳을 못 찾겠어요.</p>
            <p>옆에서 한번 알려주실 분 계실까요?</p>
          </div>
          <div className="request-need">
            <p className="request-need-description" aria-live="polite">
              {needed ? '필요를 비공개로 표시했어요.' : '나도 필요한 도움으로 표시해 두세요.'}
              <br />
              배울 자리가 생기면 알려드려요.
            </p>
            <div className="request-need-actions">
              <NeedToggle selected={needed} count={8 + Number(needed)} toggle={toggleNeeded} />
              <button
                type="button"
                className="request-need-info"
                onClick={() => action('필요 표시 안내')}
              >
                안내
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="request-detail-footer">
        <button
          type="button"
          className="request-reward"
          onClick={() => action('도움 제공자 보상 안내')}
        >
          도움 나누고 30분에 1,000P&nbsp; ›
        </button>
        <Button onClick={offer}>도움 제안하기</Button>
      </footer>
      <div className="request-detail-home-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
