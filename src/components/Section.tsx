import { ReactElement, useEffect, useRef } from "react";
import Question from "./Question";
import { Card, Box } from "@mui/material";
import { useQuestions } from "../libs/QuestionsProvider";

export default function Section(): ReactElement {
  const {
    state: { page, questions },
  } = useQuestions();

  const pageQuestions = questions.filter((question) => question.set === page);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when page changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [page]);

  return (
    <Card
      sx={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(240,235,255,0.95) 100%)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "24px",
        boxShadow:
          "0 20px 40px rgba(118, 75, 162, 0.3), 0 8px 16px rgba(118, 75, 162, 0.2)",
        border: "2px solid rgba(255,255,255,0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        ref={scrollContainerRef}
        sx={{
          py: 4,
          px: { xs: 3, sm: 4, md: 6 },
          overflow: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(196, 113, 237, 0.1)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(45deg, #c471ed, #764ba2)",
            borderRadius: "4px",
            "&:hover": {
              background: "linear-gradient(45deg, #764ba2, #c471ed)",
            },
          },
        }}
      >
        {pageQuestions.map((question) => (
          <Question key={question.id} {...question} />
        ))}
      </Box>
    </Card>
  );
}
