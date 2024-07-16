import {
  set1,
  set2,
  set3,
  set4,
  set5,
  set6,
  set7,
  set8,
  set9,
  set10,
  set11,
  set12,
} from "./data";

export enum Category {
  PassiveAggressive = "passiveAggressive",
  Compulsive = "compulsive",
  Paranoid = "paranoid",
  Narcissistic = "narcissistic",
  Codependent = "codependent",
}

export interface Question {
  question: string;
  set: number;
  category: Category;
}

const getCategory = (index: number): Category => {
  switch (index) {
    case 0:
      return Category.PassiveAggressive;
    case 1:
      return Category.Compulsive;
    case 2:
      return Category.Paranoid;
    case 3:
      return Category.Narcissistic;
    case 4:
      return Category.Codependent;
    default:
      return Category.PassiveAggressive;
  }
};

export const allQuestions: Question[] = [
  ...set1.map((question, index) => {
    return {
      question,
      set: 1,
      category: getCategory(index),
    };
  }),
  ...set2.map((question, index) => ({
    question,
    set: 2,
    category: getCategory(index),
  })),
  ...set3.map((question, index) => ({
    question,
    set: 3,
    category: getCategory(index),
  })),
  ...set4.map((question, index) => ({
    question,
    set: 4,
    category: getCategory(index),
  })),
  ...set5.map((question, index) => ({
    question,
    set: 5,
    category: getCategory(index),
  })),
  ...set6.map((question, index) => ({
    question,
    set: 6,
    category: getCategory(index),
  })),
  ...set7.map((question, index) => ({
    question,
    set: 7,
    category: getCategory(index),
  })),
  ...set8.map((question, index) => ({
    question,
    set: 8,
    category: getCategory(index),
  })),
  ...set9.map((question, index) => ({
    question,
    set: 9,
    category: getCategory(index),
  })),
  ...set10.map((question, index) => ({
    question,
    set: 10,
    category: getCategory(index),
  })),
  ...set11.map((question, index) => ({
    question,
    set: 11,
    category: getCategory(index),
  })),
  ...set12.map((question, index) => ({
    question,
    set: 12,
    category: getCategory(index),
  })),
];
