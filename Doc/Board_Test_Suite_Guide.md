# 게시판 테스트 대시보드 사용 가이드 (Board Test Suite Guide)

이 프로젝트는 **Artractive 게시판 위젯**을 실시간으로 테스트하고, 다양한 게시판 타입(공지사항, 자유게시판, 갤러리 등)을 교체하며 검증할 수 있는 **통합 테스트 대시보드**입니다.

---

## 주요 기능

1. **실시간 게시판 프리셋 전환**:
   - 대시보드 좌측의 프리셋 버튼을 클릭하여 `default`, `notice`, `gallery`, `qna` 슬러그(Slug) 게시판으로 즉시 전환하여 테스트할 수 있습니다.

2. **커스텀 설정 실시간 반영**:
   - 본인의 API Key와 테스트하고자 하는 커스텀 Board Slug를 설정 패널에 입력하면, 새로고침 없이 즉시 해당 설정으로 임베디드 게시판이 변경됩니다.
   - 입력된 API Key는 브라우저의 `localStorage`에 저장되어 재접속 시에도 유지됩니다.

3. **임베드용 iframe 코드 자동 생성기**:
   - 설정이 적용될 때마다, 사용자가 자신의 외부 사이트에 게시판을 바로 드롭인(Drop-in)하여 붙여넣을 수 있는 `<iframe>` HTML 코드를 실시간으로 빌드 및 제공합니다.
   - 복사 버튼을 누르면 해당 코드가 즉시 클립보드에 복사됩니다.

4. **프리미엄 반응형 UI**:
   - 세련된 글래스모피즘(Glassmorphic)과 암부 네온 글로우 스타일로 디자인되어 모바일 기기에서도 깔끔하게 작동합니다.

---

## 로컬 개발 및 실행 방법

1. **의존성 패키지 설치** (최초 1회):
   ```bash
   npm install
   ```

2. **로컬 개발 서버 실행**:
   ```bash
   npm run dev
   ```
   실행 후 터미널에 출력되는 로컬 주소(기본: [http://localhost:5173/BulletinBD/](http://localhost:5173/BulletinBD/))로 접속하여 대시보드를 사용할 수 있습니다.

3. **프로덕션 빌드 테스트**:
   ```bash
   npm run build
   ```
   Vite 컴파일러를 통해 빌드 산출물이 `dist/` 폴더에 생성됩니다. Multi-page 설정으로 `index.html`과 `board.html`이 함께 번들링됩니다.

---

## GitHub Pages 배포 방법

프로젝트의 변경 사항을 GitHub Pages(`gh-pages` 브랜치)로 배포하려면 다음 단계를 진행합니다.

1. **배포 명령어 실행**:
   ```bash
   npm run deploy
   ```
   이 명령은 내부적으로 `vite build`를 실행하여 최신 빌드 파일을 만들고, `gh-pages` 모듈을 사용해 `dist/` 폴더의 내용을 GitHub 원격 저장소의 `gh-pages` 브랜치에 자동으로 커밋 및 푸시합니다.

2. **배포 결과 확인**:
   - 배포 완료 후 `https://<GitHub_아이디>.github.io/BulletinBD/` 주소로 접속하면 실시간으로 서비스되는 대시보드를 확인할 수 있습니다.

---

## 파일 구조

```
BulletinBD/
├── Doc/                                # 문서 폴더
│   ├── Client_Board_Integration_Guide.md # 클라이언트 연동 가이드
│   └── Board_Test_Suite_Guide.md         # 테스트 대시보드 가이드 (본 문서)
├── index.html                          # 대시보드 메인 페이지 (Portal)
├── board.html                          # 개별 게시판 위젯 페이지 (Vite Entry 2)
├── vite.config.js                      # Vite 설정 파일 (Base Path & Multi-page)
├── package.json                        # NPM 패키지 설정 & 스크립트
└── README.md                           # 프로젝트 전체 개요 리드미
```
