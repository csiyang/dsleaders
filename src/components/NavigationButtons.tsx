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
    <Stack
      direction="row"
      gap={2}
      sx={{
        // width: "100%",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: 2,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <Button
        variant="outlined"
        onClick={handlePreviousPage}
        disabled={page === 1}
        sx={{
          ...buttonStyles,
          background: "rgba(255,255,255,0.9)",
          color: "#764ba2",
          border: "2px solid rgba(118, 75, 162, 0.3)",
          "&:hover": {
            ...buttonStyles["&:hover"],
            background: "rgba(255,255,255,1)",
            border: "2px solid #764ba2",
          },
          "&:disabled": {
            background: "rgba(255,255,255,0.5)",
            color: "rgba(118, 75, 162, 0.5)",
            border: "2px solid rgba(118, 75, 162, 0.2)",
          },
        }}
      >
        Previous
      </Button>

      {page === 12 ? (
        <SubmitButton />
      ) : (
        <Button
          variant="contained"
          fullWidth
          onClick={handleNextPage}
          sx={{
            ...buttonStyles,
            background: "linear-gradient(45deg, #c471ed, #764ba2)",
            color: "white",
            border: "none",
            "&:hover": {
              ...buttonStyles["&:hover"],
              background: "linear-gradient(45deg, #764ba2, #c471ed)",
            },
          }}
        >
          Next
        </Button>
      )}
    </Stack>
  );
}
