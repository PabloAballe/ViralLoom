export interface VideoData {
  id: string;
  title: string;
  channel: string;
  views: number;
  vph: number;
  published_at: string;
  published_relative: string;
  hours_ago?: number;
  category: string;
  category_slug: string;
  url: string;
  thumbnail: string;
  description?: string;
}
