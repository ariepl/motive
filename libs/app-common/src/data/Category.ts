import { Article } from './Article';

export interface Category {
  id: number;
  title: string;
  icon: string;
  articles: Article[];
}
