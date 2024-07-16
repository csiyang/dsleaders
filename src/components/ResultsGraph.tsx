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
  let significantAnswer = 0;
  let significantCategory = "";

  const data = results.map(({ result, category }) => {
    if (result > significantAnswer) {
      significantAnswer = result;
      significantCategory = category;
    }

    return {
      category: startCase(category),
      result,
      fullMark: 12,
    };
  });

  console.log("force build");

  return (
    <Stack justifyContent="center" alignItems="center">
      <>
        <Typography>You are a</Typography>
        <Typography variant="h4">{startCase(significantCategory)}</Typography>
        <Typography>leader</Typography>
      </>
      <Box sx={{ height: "400px", width: "540px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="50%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <Radar
              dataKey="result"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
}
