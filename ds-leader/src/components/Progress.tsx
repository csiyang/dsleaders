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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={normalize(page)} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${page}/12`}
        </Typography>
      </Box>
    </Box>
  );
}
