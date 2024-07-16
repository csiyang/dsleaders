import { Category } from "./helpers";
import { QuestionType } from "./QuestionsProvider";

export default function calculateResults(questions: QuestionType[]): {
  category: Category;
  result: number;
}[] {
  function getCategoryResult(category: Category) {
    return (
      questions
        .filter((q) => q.category === category)
        .reduce((acc, q) => acc + q.answer, 0) / 5
    );
  }

  const passiveAggressive = {
    category: Category.PassiveAggressive,
    result: getCategoryResult(Category.PassiveAggressive),
  };

  const compulsive = {
    category: Category.Compulsive,
    result: getCategoryResult(Category.Compulsive),
  };

  const paranoid = {
    category: Category.Paranoid,
    result: getCategoryResult(Category.Paranoid),
  };

  const narcissistic = {
    category: Category.Narcissistic,
    result: getCategoryResult(Category.Narcissistic),
  };

  const codependent = {
    category: Category.Codependent,
    result: getCategoryResult(Category.Codependent),
  };

  return [passiveAggressive, compulsive, paranoid, narcissistic, codependent];
}
