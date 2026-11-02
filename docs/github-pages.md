# GitHub Pages 배포

`.github/workflows/deploy-pages.yml`은 `main` 브랜치에 push하거나 Actions에서 수동 실행하면 앱을 빌드한 뒤 Pages에 배포합니다. 배포되는 파일은 `dist/`이며 소스와 node_modules는 배포 파일에 포함하지 않습니다.

## 최초 설정

1. GitHub 저장소에 프로젝트를 올립니다. `.github/`, `src/`, `public/`, package-lock.json을 포함하고 node_modules와 dist는 제외합니다.
2. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
3. `main`에 push하거나 **Actions → Deploy to GitHub Pages → Run workflow**를 실행합니다.
4. 실행이 성공하면 Pages 설정 또는 배포 작업에 표시되는 사이트 주소로 접속합니다.

Vite의 `base: './'`와 `import.meta.env.BASE_URL`을 사용하므로 `https://사용자명.github.io/저장소명/` 아래에서도 이미지와 빌드 파일의 상대 경로가 유지됩니다. 화면 이동은 앱 상태를 사용하므로 별도의 서버 라우팅이나 404 페이지가 필요하지 않습니다.

## 로컬 검사

```sh
npm run format:check
npm run build
npm run preview
```

참고: [Vite GitHub Pages 배포 가이드](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages 사용자 지정 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
