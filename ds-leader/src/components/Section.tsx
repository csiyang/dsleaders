import { ReactElement } from "react";
import Question from "./Question";
import { Card, Stack, Button, Typography } from "@mui/material";
import { useQuestions } from "../libs/QuestionsProvider";

export default function Section(): ReactElement {
  const {
    state: { page, questions },
    dispatch,
  } = useQuestions();

  const pageQuestions = questions.filter((question) => question.set === page);

  function handlePreviousPage() {
    if (page > 1) {
      dispatch({
        type: "SetPageAction",
        page: page - 1,
      });
    }
  }
  function handleNextPage() {
    if (page < 12) {
      dispatch({
        type: "SetPageAction",
        page: page + 1,
      });
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
        {pageQuestions.map((question) => (
          <Question key={question.id} {...question} />
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
