
export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}
