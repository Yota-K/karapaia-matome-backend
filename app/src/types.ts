export type Post = {
  postId: number;
  title: string;
  url: string;
  createdAt: string;
  comment: number;
  archives: {
    catName: string;
    catUrl: string;
  }[];
};
