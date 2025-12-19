export interface ArticleAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  subtitle: string;
  author: ArticleAuthor;
  date: string;
  updateDate: string;
  category: string;
  tags: string[];
  views: number;
  readTime: string;
}

export interface ContentSection {
  type: 'heading' | 'paragraph' | 'code' | 'alert' | 'quote' | 'link-card' | 'list';
  level?: number;
  text?: string;
  id?: string;
  language?: string;
  code?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  content?: string;
  author?: string;
  url?: string;
  image?: string;
  description?: string;
  items?: string[];
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface CommentAuthor {
  name: string;
  avatar: string;
}

export interface CommentReply {
  id: number;
  author: CommentAuthor;
  content: string;
  date: string;
  likes: number;
}

export interface Comment {
  id: number;
  author: CommentAuthor;
  content: string;
  date: string;
  likes: number;
  replies: CommentReply[];
}

export interface RelatedArticle {
  id: number;
  title: string;
  category: string;
}
