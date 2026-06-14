# 클라이언트 게시판 연동 가이드

본 문서는 **Artractive API 서비스를 이용 중인 클라이언트**가 자신의 GitHub Pages 정적 사이트에 게시판 위젯을 연동하는 전체 과정을 안내합니다.

---

## 개요

Artractive는 클라이언트 사이트에 단 하나의 HTML 파일만 추가하면 완성되는 **드롭인(Drop-in) 게시판 위젯**을 제공합니다.
별도의 서버, DB, 백엔드 개발 없이 사진·동영상 첨부, 댓글, 검색, 페이징 기능이 모두 포함된 게시판을 즉시 사용할 수 있습니다.

**지원 기능:**
- 📝 글쓰기 (제목, 본문, 사진/동영상 첨부, 비밀번호 설정)
- 💬 댓글 작성 및 삭제 (비밀번호 기반)
- 🔍 제목·본문·작성자 통합 검색
- 📄 페이지네이션
- 📱 모바일 반응형 디자인

---

## 사전 준비

연동을 시작하기 전에 **관리자(Artractive)로부터 아래 정보를 발급받아야 합니다.**

| 항목 | 설명 | 예시 | 발급 주체 |
|------|------|------|----------|
| **API Key** | 프로젝트 고유 인증 키 | `art_xxxxxxxxxxxxxxxx` | Artractive 콘솔에서 발급 |
| **Board Slug** | 게시판 고유 구분 코드 | `notice`, `gallery`, `qna` 등 | **클라이언트가 직접 결정** |

> [!NOTE]
> **Board Slug는 발급 개념이 아닙니다.** 클라이언트가 원하는 영문 소문자 문자열을 자유롭게 정해서 사용하면 됩니다. 같은 API Key를 사용하더라도 Slug 값이 다르면 완전히 분리된 게시판으로 동작합니다.
> 예: 공지사항 → `notice`, 갤러리 → `gallery`, Q&A → `qna`

> [!IMPORTANT]
> API Key는 외부에 노출되지 않도록 주의하세요. API Key가 유출되면 무단으로 게시물이 작성될 수 있습니다.

> [!WARNING]
> **알려진 보안 한계 (Known Limitation)**: GitHub Pages와 같은 정적 사이트에 API Key를 직접 삽입하면 소스 보기로 키가 노출됩니다.
> GitHub Secrets/Deploy Keys는 빌드 파이프라인용이므로 이 문제를 해결하지 못합니다.
> **향후 개선 예정**: 서버에서 프로젝트별 허용 도메인(`allowed_origin`)을 등록하고, 등록된 도메인 외의 요청을 `Origin` 헤더로 차단하는 방식으로 보완할 계획입니다.

---

## 연동 방법 (단계별 안내)

### Step 1. 위젯 파일 다운로드

Artractive API 서버에서 위젯 파일을 직접 다운로드합니다.

**브라우저에서 다운로드:**
```
https://apiservice.artractive.pe.kr/board-widget.html
```

또는 `curl`을 사용해 직접 저장:
```bash
curl -o board.html https://apiservice.artractive.pe.kr/board-widget.html
```

---

### Step 2. 프로젝트 저장소에 파일 추가

다운로드한 파일을 원하는 이름으로 자신의 GitHub 저장소에 추가합니다.

```bash
# 예시: 파일 이름을 board.html로 저장하는 경우
mv board-widget.html board.html

# 저장소에 추가
git add board.html
git commit -m "feat: add Artractive board widget"
git push origin main
```

> [!NOTE]
> 파일 이름은 자유롭게 변경할 수 있습니다. `board.html`, `community.html`, `gallery.html` 등 원하는 이름을 사용하세요.

---

### Step 3. 설정값 수정 (필수)

파일을 텍스트 에디터로 열고, 파일 맨 하단의 `<script>` 태그 안에 있는 **`ARTRACTIVE_CONFIG`** 설정 블록을 찾아서 수정합니다.

```html
<!-- 파일 하단 <script> 영역 -->
<script>
  const ARTRACTIVE_CONFIG = {
    // ✅ 1. API 서버 주소 (이 값은 변경하지 않습니다)
    SERVER_URL: 'https://apiservice.artractive.pe.kr',

    // ✅ 2. 관리자로부터 발급받은 본인 프로젝트의 API Key로 교체
    API_KEY: 'art_your_project_api_key_here',

    // ✅ 3. 게시판 구분 Slug (관리자로부터 안내받은 값으로 교체)
    BOARD_SLUG: 'default'
  };
</script>
```

**수정 예시:**
```javascript
const ARTRACTIVE_CONFIG = {
  SERVER_URL: 'https://apiservice.artractive.pe.kr', // 변경 금지
  API_KEY: 'art_abc123def456',                       // ← 발급받은 API Key로 교체
  BOARD_SLUG: 'gallery'                              // ← 직접 원하는 이름으로 설정 (영문 소문자 권장)
};
```

> [!NOTE]
> `BOARD_SLUG`는 마음대로 정할 수 있는 구분 이름입니다. 입력하지 않으면 자동으로 `default`로 설정됩니다.

> [!CAUTION]
> `SERVER_URL`은 절대 변경하지 마세요. API 통신이 끊어집니다.

---

### Step 4. GitHub Pages 배포

GitHub 저장소 설정에서 GitHub Pages를 활성화합니다.

1. GitHub 저장소 → **Settings** 탭 클릭
2. 좌측 메뉴 **Pages** 클릭
3. **Source** → `Deploy from a branch` 선택
4. **Branch** → `main` (또는 `master`), 폴더 → `/ (root)` 선택
5. **Save** 클릭

배포가 완료되면 아래 형식의 URL로 게시판에 접속할 수 있습니다:
```
https://<GitHub 사용자명>.github.io/<저장소 이름>/board.html
```

**예시:**
```
https://my-username.github.io/my-portfolio/board.html
```

---

### Step 5. 동작 확인

브라우저에서 위 URL로 접속하여 아래 항목을 확인합니다.

| 확인 항목 | 정상 상태 |
|-----------|-----------|
| 게시판 목록 화면이 나타남 | ✅ |
| '글쓰기' 버튼 클릭 시 작성 모달이 열림 | ✅ |
| 글 작성 후 목록에 표시됨 | ✅ |
| 사진/동영상 첨부 업로드가 작동함 | ✅ |

> [!NOTE]
> 게시판이 비어 있으면 "등록된 게시물이 없습니다" 메시지가 표시됩니다. 직접 글을 작성해보고 정상 작동을 확인하세요.

---

## 자주 묻는 질문 (FAQ)

### Q. 게시판이 흰 화면이거나 오류 메시지가 나옵니다.
`API_KEY` 또는 `BOARD_SLUG` 값이 잘못 입력된 경우입니다.
- 브라우저 개발자 도구(F12) → **Console** 탭에서 에러 메시지를 확인하세요.
- `API_KEY`가 `art_your_project_api_key_here`로 그대로 남아 있지 않은지 확인하세요.

### Q. 여러 개의 게시판을 운영하고 싶습니다.
`BOARD_SLUG` 값만 다르게 설정한 파일을 여러 개 만들면 됩니다. Slug는 **클라이언트가 직접 원하는 이름으로 지정**하면 되며, 별도 발급이나 등록 절차가 없습니다.

```javascript
// notice.html
const ARTRACTIVE_CONFIG = { ..., BOARD_SLUG: 'notice' };

// gallery.html
const ARTRACTIVE_CONFIG = { ..., BOARD_SLUG: 'gallery' };

// qna.html
const ARTRACTIVE_CONFIG = { ..., BOARD_SLUG: 'qna' };
```
같은 API Key를 사용하더라도 Slug가 다르면 완전히 분리된 게시판 데이터로 저장됩니다.

### Q. 게시판 제목이나 부제목을 바꾸고 싶습니다.
파일 내 `<h1 id="widget-board-title">` 태그의 텍스트와 `<p id="widget-board-subtitle">` 태그의 텍스트를 직접 수정하면 됩니다.

```html
<!-- 파일 내 수정 위치 -->
<h1 id="widget-board-title">우리 갤러리</h1>
<p id="widget-board-subtitle">사진과 동영상을 자유롭게 공유하세요.</p>
```

### Q. 업로드 가능한 파일 크기나 형식에 제한이 있나요?
- **최대 용량**: 파일당 50MB
- **지원 형식**: 이미지 (JPEG, PNG, GIF, WebP), 동영상 (MP4, WebM, MOV)

### Q. 게시글이나 댓글을 관리자가 강제로 삭제할 수 있나요?
네. Artractive 관리자 콘솔(`https://apiservice.artractive.pe.kr`)에 로그인하면 해당 프로젝트의 모든 게시글과 댓글을 관리자 권한으로 삭제할 수 있습니다.

---

## 문의

연동 중 문제가 발생하거나 API Key 발급이 필요한 경우, Artractive 담당자에게 문의하세요.

- **서버 주소**: `https://apiservice.artractive.pe.kr`
- **관리자 콘솔**: `https://apiservice.artractive.pe.kr` (로그인 후 이용)
