import { ReactElement } from "react";
import { Typography, Stack, Slider } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
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
  return (
    <>
      <Typography gutterBottom>{question}</Typography>
      <Stack direction="row" sx={{ pb: 6, ":last-of-type": { pb: 0 } }}>
        <SentimentVeryDissatisfiedIcon sx={{ color: "darkred" }} />
        <Slider
          value={answer}
          onChange={handleChange}
          shiftStep={1}
          min={1}
          max={5}
          sx={{ mx: 4 }}
        />
        <SentimentSatisfiedAltIcon sx={{ color: "darkgreen" }} />
      </Stack>
    </>
  );
}
