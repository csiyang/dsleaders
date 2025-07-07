import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReactElement, useState } from "react";
import { useQuestions } from "../libs/QuestionsProvider";
import { calculateResults, Result } from "../libs/calculateResults";
import ResultsGraph from "./ResultsGraph";

export default function SubmitButton(): ReactElement {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          ...buttonStyles,
          position: "relative",
          overflow: "hidden",
          background: isHovered
            ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, #ff8a80, #ff6b6b, #ee5a24, #d84315)`
            : "linear-gradient(45deg, #ee5a24, #d84315)",
          color: "white",
          border: "none",
          transition: "background 0.3s ease",
          "&:hover": {
            ...buttonStyles["&:hover"],
          },
        }}
      >
        Submit & See Results!
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
          Your Leadership Results
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <ResultsGraph results={results} />
        </DialogContent>
      </Dialog>
    </>
  );
}
