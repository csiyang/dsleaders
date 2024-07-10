import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import Question from "./Question";
import { Card, Stack, Button, Typography } from "@mui/material";

interface Props {
  questions: string[];
  setAnswers: Dispatch<SetStateAction<number[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  calculate: () => void;
}

export default function Section({
  questions,
  setAnswers,
  page,
  setPage,
  calculate,
}: Props): ReactElement {
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

  function handleNextPage(): void {
    if (page < 12) {
      setAnswers([q1, q2, q3, q4, q5]);
      setPage((page) => page + 1);
    } else {
      setAnswers([q1, q2, q3, q4, q5]);
      calculate();
    }
  }

  function handlePreviousPage(): void {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  }

  return (
    <Stack gap={2}>
      <Typography>{page}</Typography>
      <Card
        sx={{
          backgroundColor: "#9ACEEB60",
          py: 4,
          px: 12,
          minHeight: "700px",
        }}
      >
        {questionList.map((question, index) => (
          <Question key={index} {...question} />
        ))}
      </Card>
      <Stack direction="row" gap={2} sx={{ width: "100%" }}>
        <Button variant="outlined" onClick={handlePreviousPage}>
          Previous
        </Button>

        <Button variant="contained" fullWidth onClick={handleNextPage}>
          {page === 12 ? "Submit" : "Next"}
        </Button>
      </Stack>
    </Stack>
  );
}
