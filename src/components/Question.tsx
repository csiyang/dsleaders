import { ReactElement } from "react";
import { Typography, Stack, Slider, Box } from "@mui/material";
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
    <Box
      sx={{
        flexShrink: 0,
        minHeight: "fit-content",
        pb: 3,
        px: 3,
        py: 3,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(196, 113, 237, 0.1) 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(196, 113, 237, 0.2)",
        boxShadow: "0 4px 12px rgba(118, 75, 162, 0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(118, 75, 162, 0.25)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(196, 113, 237, 0.15) 100%)",
        },
        "&:last-of-type": { pb: 3 },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.95rem", md: "1.1rem" },
          lineHeight: 1.5,
          mb: 3,
          color: "#4a4a7a",
          fontWeight: 500,
        }}
      >
        {question}
      </Typography>
      <Stack direction="row" sx={{ px: { xs: 1, md: 2 } }}>
        <Slider
          value={answer}
          onChange={handleChange}
          shiftStep={1}
          marks={marks}
          min={1}
          max={5}
          sx={{
            color: "#764ba2",
            "& .MuiSlider-thumb": {
              width: { xs: 20, md: 24 },
              height: { xs: 20, md: 24 },
              background: "linear-gradient(45deg, #c471ed, #764ba2)",
              border: "3px solid white",
              boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(118, 75, 162, 0.4)",
                // transform: "scale(1.1)",
              },
              "&::before": {
                boxShadow: "none",
              },
            },
            "& .MuiSlider-track": {
              background: "linear-gradient(45deg, #c471ed, #764ba2)",
              border: "none",
              height: 6,
            },
            "& .MuiSlider-rail": {
              background: "rgba(196, 113, 237, 0.2)",
              height: 6,
            },
            "& .MuiSlider-mark": {
              background: "#764ba2",
              width: 8,
              height: 8,
              borderRadius: "50%",
            },
            "& .MuiSlider-markLabel": {
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              color: "#764ba2",
              fontWeight: 600,
            },
          }}
        />
      </Stack>
    </Box>
  );
}
