import { Article } from './Article';
import { QuestionnairePointMessages } from './QuestionnairePointMessages';

export interface Category {
  id: number;
  title: string;
  description?: string;
  icon: string;
  articles: Article[];
  questionnairePointMessages: QuestionnairePointMessages;
}
