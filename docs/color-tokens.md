# 컬러 토큰 관리

수정 위치는 `src/styles/tokens.css`입니다.

원본: [SAIRO Figma](https://www.figma.com/design/uMAiJKNtxrWtqdLfDukKrS/UI-Prototyping?node-id=583-2).
Figma의 `Primitive Color`, `Semantic Color` 컬렉션의 Light 모드와 `SAIRO / Card material`을 읽어 반영했습니다. 실험용 Cobalt 컬렉션은 제외했습니다. Figma의 WEB code syntax 이름과 별칭 관계를 유지합니다. Figma 변경 사항이 자동으로 동기화되지는 않습니다.

## 수정 방법

- 팔레트 전체를 바꾸려면 `--primitives-color-*` 값을 수정합니다.
- 특정 역할만 바꾸려면 `--semantic-color-color-*`가 참조하는 팔레트 변수를 수정합니다.
- 새 화면에서는 색상 값을 직접 쓰지 않고 해당 역할의 semantic 토큰을 사용합니다.
- Figma에서 `lime/*`의 WEB 이름은 `--color-lime-*`이므로 그 이름을 그대로 유지했습니다.

```css
/* Figma: Primitive Color / yellow/600 */
--primitives-color-primary-600: #fdb347;

/* Figma: Semantic Color / brand/primary/main */
--semantic-color-color-brand-primary-main: var(--primitives-color-primary-600);
```

```css
.example-button {
  background: var(--semantic-color-color-brand-primary-main);
  color: var(--semantic-color-color-text-on-primary);
}
```

| 역할                        | CSS 변수                                                         |
| --------------------------- | ---------------------------------------------------------------- |
| 주요 브랜드                 | `--semantic-color-color-brand-primary-main`                      |
| 브랜드 보조 배경            | `--semantic-color-color-brand-primary-sub`                       |
| 녹색 브랜드                 | `--semantic-color-color-brand-secondary-main`                    |
| 진한 녹색 브랜드            | `--semantic-color-color-brand-secondary-sub`                     |
| 본문 / 보조 / 비활성 텍스트 | `--semantic-color-color-text-primary` / `secondary` / `tertiary` |
| 반전 텍스트                 | `--semantic-color-color-text-inverse`                            |
| 앱 배경                     | `--semantic-color-color-background-canvas`                       |
| 기본 / 보조 표면            | `--semantic-color-color-surface-default` / `subtle`              |
| 기본 / 연한 테두리          | `--semantic-color-color-border-default` / `subtle`               |

## 앱 전용 토큰과 이미지

`--app-color-*`는 Figma에 없는 프로토타입 바깥 배경, 포커스, scrim, 그림자 등의 역할입니다. 그림자와 scrim은 semantic 색상에 투명도를 혼합하므로 기본 색상을 변경하면 함께 바뀝니다. 브라우저 바깥 배경색은 기존 값을 유지합니다.

SVG는 `src/assets/figma/`에 원본을 보존합니다. `SvgAsset` 컴포넌트가 원본의 색상만 semantic 변수로 연결해 렌더링하며, 도형과 크기는 유지합니다. 새 SVG에 다른 색상이 추가되면 `SvgAsset.tsx`의 매핑도 추가합니다. 원본 색상은 매칭 키이며 테마를 수정하는 위치는 `tokens.css`입니다. 흑백 상태바는 primitive 흑백 토큰을 사용합니다.

사진·PNG는 픽셀에 색상이 포함되어 있으므로 CSS 컬러 토큰으로 재색칠하지 않습니다. 사용하지 않는 예시 그래픽 `PathArt`도 동일한 semantic 팔레트를 참조하도록 정리했습니다.
