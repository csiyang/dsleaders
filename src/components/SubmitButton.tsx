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

  const buttonStyles = {
    borderRadius: "16px",
    py: 1.5,
    px: 4,
    fontWeight: 700,
    fontSize: "1rem",
    textTransform: "none" as const,
    boxShadow: "0 4px 12px rgba(118, 75, 162, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(118, 75, 162, 0.4)",
    },
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{
          ...buttonStyles,
          background: "linear-gradient(45deg, #ff6b6b, #ee5a24, #ff9ff3)",
          color: "white",
          border: "none",
          "&:hover": {
            ...buttonStyles["&:hover"],
            background: "linear-gradient(45deg, #ee5a24, #ff6b6b, #ff9ff3)",
          },
        }}
      >
        🎯 Submit & See Results!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "24px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(240,235,255,0.98) 100%)",
            boxShadow: "0 20px 40px rgba(118, 75, 162, 0.3)",
            border: "2px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#764ba2",
            fontWeight: 700,
            fontSize: "1.5rem",
            textAlign: "center",
            pb: 1,
          }}
        >
          🎮 Your Leadership Results
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <ResultsGraph results={results} />
        </DialogContent>
      </Dialog>
    </>
  );
}
