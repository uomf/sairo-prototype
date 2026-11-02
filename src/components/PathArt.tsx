// 피그마 SVG 에셋으로 교체할 수 있는 로컬 벡터 예시입니다.
export function PathArt() {
  return (
    <svg className="path-art" viewBox="0 0 345 210" fill="none" aria-hidden="true">
      <rect width="345" height="210" rx="24" fill="var(--semantic-color-color-surface-subtle)" />
      <circle cx="278" cy="44" r="24" fill="var(--semantic-color-color-brand-primary-main)" />
      <path
        d="M110 240C70 160 270 170 216 99C198 75 148 78 164 -20"
        stroke="var(--semantic-color-color-surface-default)"
        strokeWidth="64"
      />
      <path
        d="M110 240C70 160 270 170 216 99C198 75 148 78 164 -20"
        stroke="var(--semantic-color-color-border-default)"
        strokeWidth="2"
        strokeDasharray="8 10"
      />
      <path
        d="M52 117V62M35 81L52 56L69 81Z"
        stroke="var(--semantic-color-color-brand-secondary-main)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="245" cy="130" r="11" fill="var(--semantic-color-color-brand-secondary-sub)" />
      <path
        d="M245 145L236 168M245 145L260 162M245 145L224 148"
        stroke="var(--semantic-color-color-brand-secondary-sub)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="280" cy="141" r="9" fill="var(--semantic-color-color-brand-primary-main)" />
      <path
        d="M280 154L272 177M280 154L293 170"
        stroke="var(--semantic-color-color-brand-primary-main)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}
