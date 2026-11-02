# SAIRO 모바일 프로토타입

Figma 시안을 바탕으로 구현한 React + TypeScript + Vite + Motion 모바일 웹 프로토타입입니다. 기준 화면 크기는 393×852이며 브라우저 높이에 맞춰 표시합니다.

## 로컬 실행

Node.js 22.12 이상이 필요합니다.

```sh
npm ci
npm run dev
```

## 구현된 흐름

- 홈의 ‘같이해요’ / ‘부탁해요’ 더미 목록
- ‘부탁해요’ 첫 글 → 이웃의 부탁 상세 → 도움 제안 작성 → 미리보기
- ‘저도 필요해요’ 선택·해제와 인원 수 변경
- 화면 진입·뒤로가기 슬라이드 전환
- 고정 헤더·탭·하단 메뉴, 바텀시트
- 앱 바깥 ‘알림 화면’ 버튼으로 4초 동안 표시하는 알림 배너

서버 연동 없이 동작하며 새로고침하면 상태가 초기화됩니다. 기본 서체는 Pretendard 또는 시스템 서체를 사용합니다.

## 검사 및 포맷

```sh
npm run format
npm run format:check
npm run build
npm run preview
```

## GitHub Pages

저장소: [uomf/sairo-prototype](https://github.com/uomf/sairo-prototype)

GitHub에서 **Settings → Pages → Source → GitHub Actions**를 선택합니다. 이후 `main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 `dist/`를 빌드하고 배포합니다.

배포 주소: https://uomf.github.io/sairo-prototype/ (첫 배포 성공 후 이용 가능)

[배포 설정 안내](docs/github-pages.md)

## 주요 파일

- `src/App.tsx`: 화면 이동과 앱 상태
- `src/screens/`: 화면별 컴포넌트
- `src/components/`: 공통 헤더·버튼·탭·알림 등
- `src/styles/tokens.css`: Figma 컬러 변수
- `src/styles/global.css`: 화면 스타일
- `src/data/`: 더미 데이터

[컬러 토큰 관리](docs/color-tokens.md)
