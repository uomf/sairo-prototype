import { motion } from 'motion/react';
import { SvgAsset } from './SvgAsset';

export function NeedToggle({
  selected,
  count,
  toggle,
}: {
  selected: boolean;
  count: number;
  toggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      className="need-toggle"
      aria-pressed={selected}
      onClick={toggle}
      whileTap={{ scale: 0.97 }}
    >
      <span className="need-toggle-icon" aria-hidden="true">
        {selected ? <SvgAsset file="3e906.svg" /> : <SvgAsset file="35306.svg" />}
      </span>
      <span className="need-toggle-label">{selected ? '필요 표시했어요' : '저도 필요해요'}</span>
      <span className="need-toggle-count">{count}명</span>
    </motion.button>
  );
}
