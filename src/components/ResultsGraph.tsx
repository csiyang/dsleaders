import { ReactElement } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Result } from "../libs/calculateResults";
import { Box, Stack, Typography } from "@mui/material";
import { startCase } from "lodash";

interface Props {
  results: Result[];
}

export default function ResultsGraph({ results }: Props): ReactElement {
  // Find the maximum score
  const maxScore = Math.max(...results.map((r) => r.result));

  // Get all categories with the maximum score
  const significantCategories = results
    .filter((r) => r.result === maxScore)
    .map((r) => r.category);

  // Primary category is the first one with max score
  const primaryCategory = significantCategories[0];

  // Tied categories are the rest (if any)
  const tiedCategories = significantCategories.slice(1);

  const data = results.map(({ result, category }) => ({
    category: startCase(category),
    result,
    fullMark: 12,
  }));

  return (
    <Stack justifyContent="center" alignItems="center" spacing={3}>
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(196, 113, 237, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)",
          borderRadius: "16px",
          padding: 3,
          textAlign: "center",
          border: "1px solid rgba(196, 113, 237, 0.2)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#4a4a7a",
            fontWeight: 500,
            mb: 1,
          }}
        >
          You are a
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "#764ba2",
            fontWeight: 700,
            background: "linear-gradient(45deg, #c471ed, #764ba2)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          {startCase(primaryCategory)}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#4a4a7a",
            fontWeight: 500,
          }}
        >
          leader!
        </Typography>
        {tiedCategories.length > 0 && (
          <Typography
            variant="body1"
            sx={{
              color: "#6a4c93",
              fontWeight: 500,
              mt: 2,
              fontStyle: "italic",
            }}
          >
            Tied with: {tiedCategories.map((cat) => startCase(cat)).join(", ")}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          height: "400px",
          width: "100%",
          maxWidth: "540px",
          background: "rgba(255,255,255,0.5)",
          borderRadius: "20px",
          padding: 2,
          border: "1px solid rgba(196, 113, 237, 0.2)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(118, 75, 162, 0.3)" strokeWidth={2} />
            <PolarAngleAxis
              dataKey="category"
              tick={{
                fontSize: 12,
                fill: "#764ba2",
                fontWeight: 600,
              }}
            />
            <Radar
              dataKey="result"
              stroke="#c471ed"
              strokeWidth={3}
              fill="url(#gradientFill)"
              fillOpacity={0.4}
              dot={{ fill: "#764ba2", stroke: "#c471ed", strokeWidth: 2, r: 6 }}
            />
            <defs>
              <linearGradient
                id="gradientFill"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#c471ed" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#764ba2" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
}
