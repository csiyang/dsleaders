import { Button } from "@mui/material";
import { ReactElement } from "react";
import { useQuestions } from "../libs/QuestionsProvider";
import calculateResults from "../libs/calculateResults";

export default function SubmitButton(): ReactElement {
  const {
    state: { questions },
  } = useQuestions();
  function handleSubmit() {
    const results = calculateResults(questions);
    console.log(results);
  }
  return (
    <Button variant="contained" fullWidth onClick={handleSubmit}>
      Submit
    </Button>
  );
}
