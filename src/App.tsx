import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Home } from './screens/Home';
import { SvgAsset } from './components/SvgAsset';
import { NavigationPage } from './components/NavigationPage';
import { SlideContent } from './components/SlideContent';
import { RequestDetail } from './screens/RequestDetail';
import { OfferCompose } from './screens/OfferCompose';
import { NotificationBanner } from './components/NotificationBanner';
import { BottomNavigation, Button } from './components/Common';
import type { Activity } from './data/activities';
function getAppScale() {
  return Math.max(0, innerHeight / 852);
}

export default function App() {
  const [scale, setScale] = useState(getAppScale);
  const [notificationReceivedAt, setNotificationReceivedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!notificationReceivedAt) return;
    const timeout = window.setTimeout(() => setNotificationReceivedAt(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [notificationReceivedAt]);
  const [nav, setNav] = useState('홈');
  const [navDirection, setNavDirection] = useState(1);
  function navigate(next: string) {
    const pages = ['홈', '내 약속', '대화', '마이'];
    setNavDirection(pages.indexOf(next) > pages.indexOf(nav) ? 1 : -1);
    setNav(next);
    screen.current?.scrollTo({ top: 0 });
  }
  const [requestDetailOpen, setRequestDetailOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [requestNeeded, setRequestNeeded] = useState(false);
  const homeScrollTop = useRef(0);
  const requestTrigger = useRef<HTMLElement | null>(null);
  function openRequest() {
    homeScrollTop.current = screen.current?.scrollTop ?? 0;
    requestTrigger.current = document.activeElement as HTMLElement;
    setRequestDetailOpen(true);
  }
  function closeRequest() {
    setOfferOpen(false);
    setRequestDetailOpen(false);
  }
  useLayoutEffect(() => {
    if (requestDetailOpen) return;
    if (screen.current) screen.current.scrollTop = homeScrollTop.current;
    requestTrigger.current?.focus({ preventScroll: true });
  }, [requestDetailOpen]);
  const [sheet, setSheet] = useState<string | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const screen = useRef<HTMLDivElement>(null);
  const scrollTop = useRef(0);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [joined, setJoined] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  function show(title: string) {
    if (!modalActive) {
      trigger.current = document.activeElement as HTMLElement;
      scrollTop.current = screen.current?.scrollTop ?? 0;
    }
    setModalActive(true);
    setSheet(title);
  }
  function dismiss() {
    setSheet(null);
  }
  useEffect(() => {
    const resize = () => setScale(getAppScale());
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  useLayoutEffect(() => {
    if (!sheet) return;
    close.current?.focus({ preventScroll: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
      if (e.key === 'Tab') {
        const buttons = Array.from(
          document.querySelectorAll<HTMLElement>('.sheet button,.sheet input,.sheet textarea'),
        );
        const first = buttons[0],
          last = buttons.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus({ preventScroll: true });
        }
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [sheet]);
  return (
    <MotionConfig reducedMotion="user">
      <div className="app-stage">
        <button
          type="button"
          className="notification-trigger"
          onClick={() => setNotificationReceivedAt(new Date())}
        >
          알림 화면
        </button>
        <div className="phone-slot" style={{ width: 393 * scale, height: 852 * scale }}>
          <main className="phone" style={{ transform: `scale(${scale})` }} aria-label="사이로">
            <div className="app-content" inert={modalActive ? true : undefined}>
              <div className="status-bar" aria-label="9시 41분, 신호 및 배터리 정상">
                <strong>9:41</strong>
                <SvgAsset file="d7b05.svg" />
              </div>
              <div className="navigation-stack">
                <NavigationPage root covered={requestDetailOpen}>
                  <div ref={screen} className={`screen${modalActive ? ' screen-locked' : ''}`}>
                    <SlideContent page={nav} direction={navDirection}>
                      {nav === '홈' ? (
                        <Home
                          action={show}
                          openRequest={openRequest}
                          open={(activity) => {
                            setSelected(activity);
                            setJoined(false);
                            show(activity.title);
                          }}
                        />
                      ) : (
                        <div className="destination">
                          <h1>{nav}</h1>
                          <p>
                            {nav === '내 약속'
                              ? '함께하는 이웃 활동을 확인해 보세요.'
                              : nav === '대화'
                                ? '아직 새로운 대화가 없어요.'
                                : '이웃과 함께하는 나의 사이로'}
                          </p>
                          <Button variant="text" onClick={() => navigate('홈')}>
                            홈으로 돌아가기
                          </Button>
                        </div>
                      )}
                    </SlideContent>
                  </div>
                  <BottomNavigation value={nav} change={navigate} />
                </NavigationPage>
                <AnimatePresence>
                  {requestDetailOpen && (
                    <NavigationPage key="request-detail" covered={offerOpen}>
                      <RequestDetail
                        back={closeRequest}
                        offer={() => setOfferOpen(true)}
                        needed={requestNeeded}
                        toggleNeeded={() => setRequestNeeded((value) => !value)}
                        action={show}
                        locked={modalActive}
                      />
                    </NavigationPage>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {requestDetailOpen && offerOpen && (
                    <NavigationPage key="offer-compose">
                      <OfferCompose back={() => setOfferOpen(false)} />
                    </NavigationPage>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence
              onExitComplete={() => {
                setModalActive(false);
                setSelected(null);
                requestAnimationFrame(() => {
                  if (screen.current) screen.current.scrollTop = scrollTop.current;
                  trigger.current?.focus({ preventScroll: true });
                });
              }}
            >
              {sheet && (
                <motion.div
                  className="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={dismiss}
                >
                  <motion.section
                    className="sheet"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="sheet-title"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button ref={close} className="sheet-close" aria-label="닫기" onClick={dismiss}>
                      ×
                    </button>
                    <h2 id="sheet-title">{sheet}</h2>
                    {selected ? (
                      <>
                        <p>
                          11월 {selected.day}일 · {selected.time}
                        </p>
                        <p>{selected.place}</p>
                        <p>
                          {selected.host} 이웃 · {selected.people + Number(joined)}명 참여 /{' '}
                          {selected.capacity}명
                        </p>
                        <Button disabled={joined} onClick={() => setJoined(true)}>
                          {joined ? '참여가 완료됐어요' : '함께할게요'}
                        </Button>
                      </>
                    ) : sheet === '글쓰기' ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSheet('글을 등록했어요');
                        }}
                      >
                        <label>
                          제목
                          <input required placeholder="이웃과 무엇을 함께할까요?" />
                        </label>
                        <label>
                          내용
                          <textarea required placeholder="이웃에게 전할 내용을 적어 주세요" />
                        </label>
                        <Button type="submit">등록하기</Button>
                      </form>
                    ) : sheet === '동네 선택' ? (
                      <Button variant="secondary" onClick={dismiss}>
                        연남동 ✓
                      </Button>
                    ) : (
                      <p>새로운 소식이 있으면 이곳에서 확인할 수 있어요.</p>
                    )}
                  </motion.section>
                </motion.div>
              )}
            </AnimatePresence>
            <NotificationBanner receivedAt={notificationReceivedAt} />
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
