<div align="center">
  <br />
  <h1 align="center">🔥 ViralLoom</h1>
  <p align="center">
    <strong>Real-Time Viral Video Directory & VPH (Views Per Hour) Analytics Engine</strong>
  </p>
  <p align="center">
    Automated Static Directory (SSG) detecting high-velocity emerging YouTube content before it goes mainstream.
  </p>

  <p align="center">
    <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-4.16-ff5e00?style=for-the-badge&logo=astro&logoColor=white" alt="Astro SSG" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
    <a href="https://python.org"><img src="https://img.shields.io/badge/Python-3.11-3776ab?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11" /></a>
    <a href="https://github.com/features/actions"><img src="https://img.shields.io/badge/GitHub_Actions-Automated-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" /></a>
  </p>

  <br />
  <p align="center">
    <img src="public/preview.jpg" alt="ViralLoom Dashboard Preview" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
  </p>
  <br />
</div>

---

## ⚡ What is ViralLoom?

**ViralLoom** is a professional Micro-SaaS static directory that automatically tracks, calculates, and indexes viral YouTube videos based on **VPH (Views Per Hour)** view velocity instead of static view counts.

By computing `VPH = total_views / hours_since_publication`, ViralLoom surfaces hidden viral hits and emerging trends within hours of publication.

Built with **Astro SSG**, **Tailwind CSS**, and **Python (`yt-dlp`)**, it compiles a 100% static, lightning-fast web application deployed automatically via **GitHub Actions at $0 infrastructure cost**.

---

## ✨ Key Features

- **🔥 VPH Velocity Metric**: Calculates real-time acceleration (Views Per Hour) to highlight breakout videos.
- **⚡ Instant Real-Time Search & Sorting**: Reactive filtering by keyword, channel name, or category, with sorting options (*VPH*, *Total Views*, *Most Recent*).
- **🚀 High-Growth Programmatic SEO**:
  - Automatically generates individual static pages (`/video/[id]`) with **Schema.org `VideoObject`** structured data.
  - Category landing pages (`/categoria/[slug]`) targeting long-tail tech & business keywords.
  - Automated `sitemap.xml` and canonical URL tags on every page to prevent duplicate content.
- **🎨 Glassmorphic Dark Mode UI**: Modern dark theme `#090d16` with neon orange accents, subtle micro-animations, and responsive cards.
- **🤖 Automated $0 CI/CD Pipeline**: Daily cron job via GitHub Actions that scrapes data, deduplicates video IDs, builds static pages, and deploys to **GitHub Pages**.
- **🛡️ Fault Tolerant**: Built-in fallback data and error handling if YouTube API/scraping encounters network rate limits.

---

## 🎯 Target Use Cases

| Target Audience | Primary Benefit |
| :--- | :--- |
| **📹 Content Creators** | Spot high-performing video ideas, titles, and hooks before competitors. |
| **🚀 Indie Hackers & Founders** | Discover emerging AI tools, SaaS demands, and developer trends. |
| **📈 Growth Marketers** | Identify viral topics for quick TikTok, Shorts, and affiliate content piggybacking. |
| **🔎 Trend Researchers** | Track breakout channels and sudden view velocity spikes in tech. |

---

## 🏗️ Tech Stack

- **Framework**: [Astro 4.x](https://astro.build) (Static Site Generation - SSG)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com) + [Lucide Icons](https://lucide.dev)
- **Interactive Components**: [React 18](https://react.dev)
- **Data Collector**: Python 3.11 + `yt-dlp`
- **Automation & Hosting**: GitHub Actions + GitHub Pages / Vercel ($0 Cost)

---

## 📁 Repository Structure

```text
viralloom/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Daily Cron Job & GitHub Pages Deployment pipeline
├── public/
│   └── favicon.svg             # Favicon asset
├── src/
│   ├── components/
│   │   ├── Header.astro        # Header with category navigation & status badge
│   │   ├── Footer.astro        # Footer with sitemap links
│   │   ├── ViralCard.tsx       # Video Card component with 🔥 VPH badge & stats
│   │   └── VideoGrid.tsx       # Reactive search, sort selector & card grid
│   ├── layouts/
│   │   └── Layout.astro        # Base layout with Dark Theme & Meta SEO tags
│   ├── pages/
│   │   ├── index.astro         # Home page with Hero & Use Cases
│   │   ├── 404.astro           # Custom 404 error page
│   │   ├── video/[id].astro    # Individual video SSG pages for long-tail SEO
│   │   ├── categoria/[slug].astro # Category SSG landing pages
│   │   └── sitemap.xml.ts      # Native dynamic Sitemap generator
│   └── types.ts                # TypeScript interfaces for video data
├── script.py                   # Python engine (Scraping, VPH calculation, Deduplication)
├── tendencias.json             # Static JSON database generated by script.py
├── astro.config.mjs            # Astro configuration
└── tailwind.config.mjs         # Tailwind theme setup
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/viralloom.git
cd viralloom
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
pip install yt-dlp
```

### 3. Run the VPH Scraping Script
```bash
python script.py
```
*This will fetch YouTube trends, calculate VPH metrics, deduplicate video IDs, and generate `tendencias.json`.*

### 4. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:4321`** in your browser to inspect the application.

### 5. Build for Production (SSG)
```bash
npm run build
```
The static bundle will be generated inside the `./dist` folder ready for deployment.

---

## 🔄 Automated GitHub Actions Setup ($0 Hosting)

1. Push your repository to **GitHub**.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/deploy.yml` will automatically:
   - Run daily at `00:00 UTC` (or manually via **Workflow Dispatch**).
   - Execute `script.py` to refresh trends.
   - Build Astro SSG.
   - Publish to **GitHub Pages**.

---

## 📝 License

Distributed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**. 
Free for personal and non-commercial use only. Commercial usage or monetization requires explicit permission.
