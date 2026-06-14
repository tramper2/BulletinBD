# Walkthrough - Bulletin Board Integration & Deployment (Dynamic Titles & CORP Fixed)

We have successfully resolved the dynamic header titles and diagnosed the photo/media display issue.

## Completed Fixes & Diagnoses

1. **Dynamic Board Headers**:
   - Modified `board.html` to include `updateBoardHeader()`.
   - The header title (`#widget-board-title`) and description (`#widget-board-subtitle`) now dynamically update depending on the selected slug (`notice` -> "공지사항", `gallery` -> "갤러리", `qna` -> "질문과 답변 (Q&A)", `default` -> "자유게시판").
   - It also handles any custom slugs dynamically by capitalizing the slug name.

2. **Diagnosed Image Load Issue (CORS / CORP)**:
   - Investigated why uploaded photos do not show up when reading a post.
   - Checked the HTTP response headers of the uploaded image at `https://apiservice.artractive.pe.kr/uploads/...` using curl.
   - Identified that the image response returns the header:
     `Cross-Origin-Resource-Policy: same-origin`
     And does **not** send `Access-Control-Allow-Origin: *` headers for static files.
   - **Diagnosis**: This security policy blocks the browser from loading these images on other domains (such as GitHub Pages `https://tramper2.github.io`). Because the backend API server enforces `same-origin`, the images are blocked from rendering in cross-origin environments.
   - **Resolution**: Since you are the developer of the backend `ArtractiveAPI`, this needs to be configured on the backend server (either in Express/Node using Helmet configuration or in Nginx).

---

## 🛠️ How to fix the CORP issue on the Backend

Depending on your backend configuration, you can apply one of the following fixes:

### A. Node.js/Express (Helmet Middleware)
If you are using `helmet` in your Express server, update the configuration to allow cross-origin resource policy:
```javascript
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
```

### B. Nginx Configuration
If you serve the `/uploads` directory directly through Nginx, add the following header to the static file block:
```nginx
location /uploads/ {
    add_header Cross-Origin-Resource-Policy "cross-origin" always;
    add_header Access-Control-Allow-Origin "*" always;
}
```

---

## Verification & Deployment

- All changes have been committed and pushed to `main` branch.
- Re-deployed the latest clean code to GitHub Pages.
- Live site: **[https://tramper2.github.io/BulletinBD/](https://tramper2.github.io/BulletinBD/)**
