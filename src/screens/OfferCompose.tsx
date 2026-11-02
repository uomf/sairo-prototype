import { useEffect, useRef, useState } from 'react';
import { Button, Icon } from '../components/Common';
import { AppHeader } from '../components/AppHeader';
import { SlideContent } from '../components/SlideContent';

export function OfferCompose({ back }: { back: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [capacity, setCapacity] = useState(2);
  const [editing, setEditing] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [voiceHint, setVoiceHint] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    scroll.current?.scrollTo({ top: 0 });
  }, [preview]);

  function showPreview() {
    setPreview(true);
    setEditing(null);
  }

  return (
    <section className="offer-compose" aria-label="도움 제안 작성">
      <AppHeader title="도움 제안 작성" onBack={preview ? () => setPreview(false) : back} />
      <div className="offer-progress">
        <div>
          <span>{preview ? '미리보기' : '작성'}</span>
          <span>{preview ? '2/2' : '1/2'}</span>
        </div>
        <div
          className="offer-progress-track"
          role="progressbar"
          aria-label="작성 진행 상태"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={preview ? 2 : 1}
        >
          <span style={{ width: preview ? '100%' : '50%' }} />
        </div>
      </div>
      <div className="offer-scroll" ref={scroll}>
        <SlideContent page={preview ? 'preview' : 'compose'} direction={preview ? 1 : -1}>
          {preview ? (
            <div className="offer-body offer-preview">
              <h1 ref={heading} tabIndex={-1}>
                {title}
              </h1>
              <p className="offer-preview-description">{description}</p>
              <div className="divider" />
              <h2>함께할 약속</h2>
              <p>{date ? date.replace('T', ' · ') : '날짜와 시간 미정'}</p>
              <p>{place || '장소 미정'}</p>
              <p>{capacity}명까지 · 내 인원은 제외</p>
            </div>
          ) : (
            <form
              id="offer-form"
              className="offer-body"
              onSubmit={(event) => {
                event.preventDefault();
                showPreview();
              }}
            >
              <h1 ref={heading} tabIndex={-1}>
                어떤 경험을 나누고 싶나요?
              </h1>
              <Button
                type="button"
                variant="subtle"
                className="offer-voice"
                onClick={() => setVoiceHint((value) => !value)}
              >
                말로 내용 입력하기
              </Button>
              {voiceHint && (
                <p className="offer-hint" role="status">
                  입력란을 선택한 뒤 기기 키보드의 음성 입력 기능으로 내용을 적어주세요.
                </p>
              )}
              <label className="offer-field">
                제목
                <input
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="제목을 적어주세요"
                />
              </label>
              <label className="offer-field">
                함께 배울 내용
                <div className="offer-textarea">
                  <textarea
                    required
                    maxLength={500}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="어떤 도움을 나눌지 편하게 적어주세요."
                    aria-describedby="offer-character-count"
                  />
                  <span id="offer-character-count">
                    {description ? `${description.length}/500자` : '최대 500자'}
                  </span>
                </div>
              </label>
              <div className="divider" />
              <h2>함께할 약속</h2>
              <div>
                <button
                  type="button"
                  className="offer-setting"
                  aria-expanded={editing === 'date'}
                  aria-controls="offer-date"
                  onClick={() => setEditing(editing === 'date' ? null : 'date')}
                >
                  <Icon file="35c17.svg" />
                  <span>
                    <strong>날짜와 시간</strong>
                    <span>{date ? date.replace('T', ' · ') : '날짜와 시간을 정해주세요'}</span>
                  </span>
                </button>
                {editing === 'date' && (
                  <label id="offer-date" className="offer-setting-editor">
                    날짜와 시간
                    <input
                      aria-label="날짜와 시간"
                      type="datetime-local"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="offer-setting"
                  aria-expanded={editing === 'place'}
                  aria-controls="offer-place"
                  onClick={() => setEditing(editing === 'place' ? null : 'place')}
                >
                  <Icon file="30476.svg" />
                  <span>
                    <strong>만나는 곳</strong>
                    <span>{place || '장소를 검색하거나 직접 정해주세요'}</span>
                  </span>
                </button>
                {editing === 'place' && (
                  <label id="offer-place" className="offer-setting-editor">
                    만나는 곳
                    <input
                      aria-label="만나는 곳"
                      value={place}
                      onChange={(event) => setPlace(event.target.value)}
                      placeholder="장소를 직접 적어주세요"
                    />
                  </label>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="offer-setting"
                  aria-expanded={editing === 'capacity'}
                  aria-controls="offer-capacity"
                  onClick={() => setEditing(editing === 'capacity' ? null : 'capacity')}
                >
                  <Icon file="d0473.svg" />
                  <span>
                    <strong>함께 배울 인원</strong>
                    <span>{capacity}명까지 · 내 인원은 제외</span>
                  </span>
                </button>
                {editing === 'capacity' && (
                  <label id="offer-capacity" className="offer-setting-editor">
                    함께 배울 인원
                    <input
                      aria-label="함께 배울 인원"
                      type="number"
                      required
                      min={1}
                      max={20}
                      value={capacity}
                      onChange={(event) => setCapacity(Number(event.target.value))}
                    />
                  </label>
                )}
              </div>
            </form>
          )}
        </SlideContent>
      </div>
      <footer className="offer-footer">
        {preview ? (
          <Button onClick={() => setPreview(false)}>수정하기</Button>
        ) : (
          <Button type="submit" form="offer-form">
            미리보기
          </Button>
        )}
      </footer>
      <div className="request-detail-home-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
