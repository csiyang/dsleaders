import { ReactElement } from "react";
import { Typography, Stack, Slider } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { QuestionType, useQuestions } from "../libs/QuestionsProvider";

export default function Question({
  id,
  answer,
  question,
}: QuestionType): ReactElement {
  const { dispatch } = useQuestions();

  function handleChange(event: Event, value: number | number[]) {
    dispatch({
      type: "SetQuestionAction",
      id: id,
      answer: value as number,
    });
  }

  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  return (
    <>
      <Typography gutterBottom>{question}</Typography>
      <Stack direction="row" sx={{ pb: 6, ":last-of-type": { pb: 0 } }}>
        <Slider
          value={answer}
          onChange={handleChange}
          shiftStep={1}
          marks={marks}
          min={1}
          max={5}
        />
      </Stack>
    </>
  );
}
