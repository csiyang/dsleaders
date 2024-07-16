import { ReactElement } from "react";
import { Stack, Button } from "@mui/material";
import { useQuestions } from "../libs/QuestionsProvider";
import SubmitButton from "./SubmitButton";

export default function NavigationButtons(): ReactElement {
  const {
    state: { page },
    dispatch,
  } = useQuestions();

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
    <Stack direction="row" gap={2} sx={{ width: "100%" }}>
      <Button variant="outlined" onClick={handlePreviousPage}>
        Previous
      </Button>

      {page === 12 ? (
        <SubmitButton />
      ) : (
        <Button variant="contained" fullWidth onClick={handleNextPage}>
          Next
        </Button>
      )}
    </Stack>
  );
}
