export type Post = {
  title: string;
  url: string;
  createdAt: string;
  comment: number;
  archives: {
    catName: string;
    catUrl: string;
  }[];
};
