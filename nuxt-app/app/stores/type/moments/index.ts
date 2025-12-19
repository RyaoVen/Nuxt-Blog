export interface MomentComment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  images: string[];
  date: string;
  likes: number;
}

export interface MomentLink {
  title: string;
  url: string;
  cover: string;
}

export interface Moment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  images: string[];
  date: string;
  likes: number;
  comments: MomentComment[];
  type: string;
  link?: MomentLink;
}
