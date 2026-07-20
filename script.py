import json
import os
import sys
from datetime import datetime, timezone
import math

try:
    import yt_dlp
except ImportError:
    yt_dlp = None

TENDENCIAS_FILE = os.path.join(os.path.dirname(__file__), "tendencias.json")

# Default search terms for high performing tech & business niches
SEARCH_TERMS = [
    "AI SaaS tutorial 2026",
    "Viral AI Tools 2026",
    "Astro web framework",
    "Python automation script",
    "Micro SaaS business model",
    "Next.js tutorial"
]

def format_relative_time(hours_ago):
    if hours_ago < 1:
        minutes = int(hours_ago * 60)
        return f"{max(1, minutes)} min ago"
    elif hours_ago < 24:
        h = int(hours_ago)
        return f"{h}h ago"
    else:
        days = int(hours_ago / 24)
        return f"{days}d ago"

def determine_category(title, description=""):
    text = f"{title} {description}".lower()
    if any(k in text for k in ["ai", "ia", "chatgpt", "gpt", "claude", "llm", "agent", "deepseek", "gemini"]):
        return "AI & Tech", "ai-tech"
    elif any(k in text for k in ["astro", "react", "next", "python", "code", "programming", "software", "dev"]):
        return "Development", "development"
    elif any(k in text for k in ["saas", "micro-saas", "startup", "business", "monetize", "mrr"]):
        return "Entrepreneurship", "entrepreneurship"
    elif any(k in text for k in ["marketing", "seo", "youtube", "growth", "viral"]):
        return "Marketing & SEO", "marketing-seo"
    else:
        return "Technology", "technology"

def fetch_youtube_trends():
    if not yt_dlp:
        print("[WARN] yt-dlp library not available. Skipping fresh scraping.")
        return []

    ydl_opts = {
        'extract_flat': 'in_playlist',
        'skip_download': True,
        'quiet': True,
        'no_warnings': True,
        'ignoreerrors': True,
    }

    videos_dict = {}
    now = datetime.now(timezone.utc)

    print("[INFO] Scraping YouTube trends using yt-dlp...")

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        for query in SEARCH_TERMS:
            try:
                search_url = f"ytsearch10:{query}"
                result = ydl.extract_info(search_url, download=False)
                if not result or 'entries' not in result:
                    continue

                for entry in result['entries']:
                    if not entry or not entry.get('id'):
                        continue

                    vid_id = entry['id']
                    if vid_id in videos_dict:
                        continue

                    try:
                        info = ydl.extract_info(f"https://www.youtube.com/watch?v={vid_id}", download=False)
                        if not info:
                            continue
                        
                        views = info.get('view_count', 0) or 0
                        upload_date_str = info.get('upload_date')
                        timestamp = info.get('timestamp')

                        if timestamp:
                            pub_dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
                        elif upload_date_str:
                            pub_dt = datetime.strptime(upload_date_str, "%Y%m%d").replace(tzinfo=timezone.utc)
                        else:
                            pub_dt = now

                        hours_diff = max((now - pub_dt).total_seconds() / 3600.0, 0.1)
                        vph = int(views / hours_diff)

                        title = info.get('title', 'Untitled Video')
                        channel = info.get('uploader') or info.get('channel') or 'YouTube Channel'
                        cat_name, cat_slug = determine_category(title, info.get('description', ''))
                        thumbnail = info.get('thumbnail') or f"https://i.ytimg.com/vi/{vid_id}/hqdefault.jpg"

                        videos_dict[vid_id] = {
                            "id": vid_id,
                            "title": title,
                            "channel": channel,
                            "views": views,
                            "vph": vph,
                            "published_at": pub_dt.isoformat(),
                            "published_relative": format_relative_time(hours_diff),
                            "hours_ago": round(hours_diff, 1),
                            "category": cat_name,
                            "category_slug": cat_slug,
                            "url": f"https://www.youtube.com/watch?v={vid_id}",
                            "thumbnail": thumbnail,
                            "description": (info.get('description') or title)[:250] + "..."
                        }

                    except Exception as e:
                        print(f"[WARN] Error processing video {vid_id}: {e}")
                        continue

            except Exception as e:
                print(f"[WARN] Error executing search query '{query}': {e}")
                continue

    videos_list = list(videos_dict.values())
    videos_list.sort(key=lambda x: x['vph'], reverse=True)
    return videos_list

def get_fallback_data():
    now_iso = datetime.now(timezone.utc).isoformat()
    return [
        {
            "id": "dQw4w9WgXcQ",
            "title": "Build a Full-Stack AI Agent SaaS with Astro & Python in 2026",
            "channel": "Tech Innovators",
            "views": 485000,
            "vph": 15200,
            "published_at": now_iso,
            "published_relative": "4h ago",
            "hours_ago": 4.0,
            "category": "AI & Tech",
            "category_slug": "ai-tech",
            "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "thumbnail": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
            "description": "Learn how to build and monetize your own Micro-SaaS using Artificial Intelligence, advanced automation, and zero-cost SSG pipelines."
        },
        {
            "id": "kJQP7kiw5Fk",
            "title": "Astro 4.0 + Tailwind CSS: The Future of Lightning Fast Web Development",
            "channel": "Frontend Mastery",
            "views": 210000,
            "vph": 8750,
            "published_at": now_iso,
            "published_relative": "12h ago",
            "hours_ago": 12.0,
            "category": "Development",
            "category_slug": "development",
            "url": "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
            "thumbnail": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
            "description": "Discover how Astro revolutionized static sites by integrating multi-framework reactive components without shipping unnecessary JS to the client."
        },
        {
            "id": "fJ9rUzIMcZQ",
            "title": "How to Launch a Micro-SaaS with $0 Investment and Get 100 Users in 7 Days",
            "channel": "Indie Hacker Club",
            "views": 175000,
            "vph": 6200,
            "published_at": now_iso,
            "published_relative": "1d ago",
            "hours_ago": 24.0,
            "category": "Entrepreneurship",
            "category_slug": "entrepreneurship",
            "url": "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
            "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
            "description": "Step-by-step organic acquisition and programmatic SEO strategies to validate your software idea in record time."
        }
    ]

def main():
    videos = []

    try:
        videos = fetch_youtube_trends()
    except Exception as e:
        print(f"[ERROR] Global scraping failed: {e}")

    if not videos:
        if os.path.exists(TENDENCIAS_FILE):
            try:
                with open(TENDENCIAS_FILE, "r", encoding="utf-8") as f:
                    existing = json.load(f)
                    if isinstance(existing, list) and len(existing) > 0:
                        print("[INFO] Using existing valid tendencias.json file.")
                        videos = existing
            except Exception as e:
                print(f"[WARN] Failed reading existing file: {e}")

        if not videos:
            print("[INFO] Injecting high quality default seed data.")
            videos = get_fallback_data()

    # Translate existing categories & relative time if needed
    for v in videos:
        cat_name, cat_slug = determine_category(v.get('title', ''), v.get('description', ''))
        v['category'] = cat_name
        v['category_slug'] = cat_slug
        if 'hours_ago' in v:
            v['published_relative'] = format_relative_time(v['hours_ago'])

    unique_videos = []
    seen_ids = set()
    for v in videos:
        if v['id'] not in seen_ids:
            seen_ids.add(v['id'])
            unique_videos.append(v)

    with open(TENDENCIAS_FILE, "w", encoding="utf-8") as f:
        json.dump(unique_videos, f, ensure_ascii=False, indent=2)

    print(f"[SUCCESS] Successfully updated {len(unique_videos)} trending videos in {TENDENCIAS_FILE}")

if __name__ == "__main__":
    main()
