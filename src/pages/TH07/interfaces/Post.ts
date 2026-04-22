export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  date: string;
  tags: string[];
  status: 'Nháp' | 'Đã đăng';
  views: number;
}