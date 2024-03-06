export type EmailQuestion = {
  question: string;
  description: string | null;
  type: "email";
};

export type ChoiceQuestion = {
  question: string;
  description: string | null;
  type: "choice";
  subtype: "single";
  options: string[];
};

export type NumberQuestion = {
  question: string;
  description: string | null;
  type: "number";
  subtype: "integer";
  minValue: number;
  maxValue: number;
};

export type LikertQuestion = {
  question: string;
  description: string | null;
  type: "likert";
  subtype: number;
  minValue: string;
  maxValue: string;
};

export type SelectQuestion = {
  question: string;
  description: string | null;
  type: "select";
  subtype: "single";
  options?: string[];
};

export type TextQuestion = {
  question: string;
  description: string | null;
  type: "text";
};

export type BinaryChoiceQuestion = {
  question: string;
  description: string | null;
  type: "choice";
  subtype: "binary";
  options: ["Yes", "No"];
};

export type Question =
  | EmailQuestion
  | ChoiceQuestion
  | NumberQuestion
  | LikertQuestion
  | SelectQuestion
  | TextQuestion
  | BinaryChoiceQuestion;

export type Category = {
  category: string;
  description: string;
  questions: Question[];
};

export type Survey = {
  begin: Category[];
  end: Category[];
}