export interface Question {
  id: number;
  categoryId: number;
  question: string;
  options: Option[];
}

export interface Option {
  text: string;
  points: number;
}
