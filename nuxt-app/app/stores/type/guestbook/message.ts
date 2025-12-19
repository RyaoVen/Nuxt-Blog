export interface GuestbookMessage {
  id: number;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  date: string;
  likes: number;
  isOwner: boolean;
}
