import { Icon } from './Common';

type AppHeaderProps = {
  title: string;
  onBack: () => void;
  backLabel?: string;
};

/** 상세 화면 공통 헤더. 스크롤 영역 바깥에 배치해 상단에 고정합니다. */
export function AppHeader({ title, onBack, backLabel = '뒤로가기' }: AppHeaderProps) {
  return (
    <header className="app-header">
      <button type="button" className="icon-button" aria-label={backLabel} onClick={onBack}>
        <Icon file="b65ff.svg" />
      </button>
      <span className="app-header-title">{title}</span>
    </header>
  );
}
