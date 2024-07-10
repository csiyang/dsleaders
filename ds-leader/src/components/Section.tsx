import { ReactElement, useState } from "react";
import Question from "./Question";
import { Card } from "@mui/material";

interface Props {
  questions: string[];
}

export default function Section({ questions }: Props): ReactElement {
  const [q1, setQ1] = useState(3);
  const [q2, setQ2] = useState(3);
  const [q3, setQ3] = useState(3);
  const [q4, setQ4] = useState(3);
  const [q5, setQ5] = useState(3);

  const questionList = [
    {
      title: questions[0],
      value: q1,
      setValue: setQ1,
    },
    {
      title: questions[1],
      value: q2,
      setValue: setQ2,
    },
    {
      title: questions[2],
      value: q3,
      setValue: setQ3,
    },
    {
      title: questions[3],
      value: q4,
      setValue: setQ4,
    },
    {
      title: questions[4],
      value: q5,
      setValue: setQ5,
    },
  ];

  return (
    <Card
      sx={{
        backgroundColor: "#9ACEEB60",
        py: 4,
        px: 12,
      }}
    >
      {questionList.map((question, index) => (
        <Question key={index} {...question} />
      ))}
    </Card>
  );
}
