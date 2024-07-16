import { ReactElement } from "react";
import Question from "./Question";
import { Card } from "@mui/material";
import { useQuestions } from "../libs/QuestionsProvider";

export default function Section(): ReactElement {
  const {
    state: { page, questions },
  } = useQuestions();

  const pageQuestions = questions.filter((question) => question.set === page);

  return (
    <Card
      sx={{
        backgroundColor: "#9ACEEB60",
        py: 4,
        px: 12,
        minHeight: "800px",
      }}
    >
      {pageQuestions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </Card>
  );
}
