export interface Passage {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
}

export interface HotPassage {
  id: number;
  title: string;
  views: number;
}

export interface Category {
  name: string;
  count: number;
}

export interface Tag {
  name: string;
  count: number;
  color: string;
}
