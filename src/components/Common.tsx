import type { ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { SvgAsset } from './SvgAsset';
export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/figma/${name}`;
export function Icon({ file }: { file: string }) {
  return <SvgAsset className="icon" file={file} />;
}
export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'text' | 'subtle';
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
export function Tabs({ value, change }: { value: string; change: (value: string) => void }) {
  return (
    <div className="tabs" role="tablist" aria-label="이웃 활동">
      {['같이해요', '부탁해요'].map((label) => (
        <button
          key={label}
          role="tab"
          aria-selected={value === label}
          onClick={() => change(label)}
        >
          {label}
          <span className="tab-line" />
          {value === label && (
            <motion.span
              className="selected-line"
              layoutId="selected-tab"
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
export function BottomNavigation({
  value,
  change,
}: {
  value: string;
  change: (value: string) => void;
}) {
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {[
        ['홈', 'd8f23.svg', '5f708.svg'],
        ['내 약속', 'fc4ea.svg', 'a27e3.svg'],
        ['대화', '946ee.svg', 'a2f6a.svg'],
        ['마이', '04e15.svg', 'aa6c6.svg'],
      ].map(([label, file, selectedFile]) => (
        <button
          key={label}
          aria-current={value === label ? 'page' : undefined}
          onClick={() => change(label)}
        >
          <Icon file={value === label ? selectedFile : file} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
