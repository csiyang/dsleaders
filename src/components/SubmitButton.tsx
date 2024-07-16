import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReactElement, useState } from "react";
import { useQuestions } from "../libs/QuestionsProvider";
import { calculateResults, Result } from "../libs/calculateResults";
import ResultsGraph from "./ResultsGraph";

export default function SubmitButton(): ReactElement {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const {
    state: { questions },
  } = useQuestions();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    handleOpen();
    setResults(calculateResults(questions));
  }
  return (
    <>
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Results</DialogTitle>
        <DialogContent>
          <ResultsGraph results={results} />
        </DialogContent>
      </Dialog>
    </>
  );
}
