# Artractive Bulletin Board Test Suite 🚀

이 프로젝트는 **Artractive API**를 연동하여 자신의 웹사이트에 삽입할 수 있는 게시판 위젯을 실시간으로 테스트하고 배포 환경을 미리 검증해 볼 수 있는 **통합 테스트 대시보드**입니다.

GitHub Pages (`gh-pages`) 배포 설정이 완료되어 있으며, 단 한 번의 명령어로 손쉽게 웹에 게시할 수 있습니다.

---

## 🎨 주요 특징

- **실시간 프리셋 게시판 변경**: 자유게시판(`default`), 공지사항(`notice`), 갤러리(`gallery`), Q&A(`qna`) 등을 클릭 한번으로 교체하며 테스트 가능
- **테스트 콘솔 기능**: 본인의 프로젝트 API Key 및 커스텀 Board Slug를 입력해 실시간 테스트 진행 (입력값은 `localStorage`에 자동 저장)
- **임베드용 iframe 코드 자동 생성기**: 선택된 옵션이 반영된 퍼블리싱용 임베드 코드를 즉시 실시간 생성 및 복사 기능 제공
- **글래스모피즘 기반 프리미엄 디자인**: 다크 모드 기반의 부드러운 네온 글로우 및 반응형 레이아웃 탑재
- **자동 빌드 & GitHub Pages 배포**: Vite 번들러와 `gh-pages`를 통한 원클릭 배포 파이프라인

---

## 📁 주요 문서 링크 (`Doc/`)

연동 및 대시보드 사용에 관한 상세 문서는 `Doc` 폴더 아래에서 찾으실 수 있습니다.

- 📖 [클라이언트 게시판 연동 가이드](Doc/Client_Board_Integration_Guide.md) - 위젯 파일 다운로드부터 일반 정적 사이트에 삽입하는 전체 방법
- 📖 [게시판 테스트 대시보드 가이드](Doc/Board_Test_Suite_Guide.md) - 본 테스트 대시보드의 사용 방법, 로컬 개발 및 상세 배포 명령어 안내

---

## ⚙️ 빠른 로컬 실행 가이드

프로젝트를 로컬 환경에서 구동하고 코드를 수정하려면 아래 명령어를 사용하세요. (Node.js 환경 필요)

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```

서버 구동 후 브라우저에서 [http://localhost:5173/BulletinBD/](http://localhost:5173/BulletinBD/) 주소로 접속하면 테스트 대시보드가 로드됩니다.

---

## 🚀 GitHub Pages 배포 방법

본 프로젝트는 `git@github.com:tramper2/BulletinBD.git`로의 GitHub Pages 배포 파이프라인을 내장하고 있습니다.

```bash
# 1. 프로젝트 빌드 및 배포 수행
npm run deploy
```

위 명령어를 실행하면 Vite 빌드가 실행되어 최적화된 파일들이 `dist/` 폴더에 생성되고, `gh-pages` 모듈이 자동으로 원격 `gh-pages` 브랜치에 업로드하여 배포가 완료됩니다.

배포가 완료되면 아래 링크로 접속할 수 있습니다:
👉 **[https://tramper2.github.io/BulletinBD/](https://tramper2.github.io/BulletinBD/)**

---

## 🛠️ 사용 기술 및 스택

- **Vite** (Static site Bundler)
- **HTML5, Vanilla CSS, JS** (ES6+)
- **FontAwesome Icons**
- **gh-pages** (Deployment tool)
