import { ReactElement } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuestions } from "../libs/QuestionsProvider";

export default function Progress(): ReactElement {
  const {
    state: { page },
  } = useQuestions();
  const MIN = 1;
  const MAX = 12;
  const normalize = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.15)",
        borderRadius: "16px",
        padding: 2,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <Box sx={{ width: "100%", mr: 2 }}>
        <LinearProgress
          variant="determinate"
          value={normalize(page)}
          sx={{
            height: 12,
            borderRadius: 6,
            backgroundColor: "rgba(255,255,255,0.3)",
            "& .MuiLinearProgress-bar": {
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,200,180,0.8) 25%, rgba(255,150,130,0.85) 50%, #ff6b6b 75%, #ee5a24 100%)",
              borderRadius: 6,
              boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          minWidth: 60,
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.9), rgba(240,235,255,0.9))",
          borderRadius: "12px",
          padding: "6px 16px",
          boxShadow: "0 2px 8px rgba(118, 75, 162, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#764ba2",
            fontWeight: 700,
            fontSize: "0.9rem",
            lineHeight: 1,
          }}
        >
          {`${page}/12`}
        </Typography>
      </Box>
    </Box>
  );
}
