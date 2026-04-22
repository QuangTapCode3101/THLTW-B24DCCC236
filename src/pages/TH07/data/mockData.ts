import { Post } from "../interfaces/Post";

export const initialPosts: Post[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Bài viết số ${i + 1}`,
  summary: `Tóm tắt nội dung bài viết số ${i + 1}...`,
  content: `# Nội dung chi tiết ${i + 1}\n\nĐây là nội dung viết bằng Markdown.`,
  thumbnail: `https://picsum.photos/seed/${i + 1}/400/200`,
  date: "2026-04-22",
  tags: i % 2 === 0 ? ["React", "Antd"] : ["TypeScript", "Vite"],
  status: "Đã đăng",
  views: Math.floor(Math.random() * 100),
}));