export default function calculateAnswers(
  answers1: number[],
  answers2: number[],
  answers3: number[],
  answers4: number[],
  answers5: number[],
  answers6: number[],
  answers7: number[],
  answers8: number[],
  answers9: number[],
  answers10: number[],
  answers11: number[],
  answers12: number[]
): { category: string; result: number }[] {
  const answers = [
    {
      category: "Passive-Aggressive",
      result: 0,
    },
    {
      category: "Compulsive",
      result: 0,
    },
    {
      category: "Paranoid",
      result: 0,
    },
    {
      category: "Narcissistic",
      result: 0,
    },
    {
      category: "Codependent",
      result: 0,
    },
  ];

  answers.forEach((answer, index) => {
    answer.result =
      (answers1[index] +
        answers2[index] +
        answers3[index] +
        answers4[index] +
        answers5[index] +
        answers6[index] +
        answers7[index] +
        answers8[index] +
        answers9[index] +
        answers10[index] +
        answers11[index] +
        answers12[index]) /
      5;
  });

  return answers;
}
