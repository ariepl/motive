import { Article } from './Article';

export interface Category {
  id: number;
  title: string;
  description?: string;
  icon: string;
  articles: Article[];
}
