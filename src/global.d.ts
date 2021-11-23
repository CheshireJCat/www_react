interface BlogEdit extends Blog {
  id: number;
  title: string;
  category: number | string;
  summary: string;
  thumb: string;
  status: number | string;
  content: string;
}

interface BlogListItem extends Blog {
  Id: number;
  Title: string;
  Category: number;
  Summary: string;
  Thumb: string;
  Status: number;
  UserId: number;
  LikeNum: number;
  UpdateTime: string;
}

interface BlogDetail extends BlogListItem {
  Content: string;
  CommentNume: number;
  CreateTime: string;
}
