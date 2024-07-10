import { ReactElement } from "react";
import { Typography, Stack, Slider } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

interface Props {
  title: string;
  value: number;
  setValue: (value: number) => void;
}

export default function Question({
  title,
  value,
  setValue,
}: Props): ReactElement {
  function handleChange(event: Event, value: number | number[]) {
    setValue(value as number);
  }
  return (
    <>
      <Typography gutterBottom>{title}</Typography>
      <Stack direction="row" sx={{ pb: 6, ":last-of-type": { pb: 0 } }}>
        <SentimentVeryDissatisfiedIcon sx={{ color: "darkred" }} />
        <Slider
          value={value}
          onChange={handleChange}
          shiftStep={1}
          min={1}
          max={5}
          sx={{ mx: 4 }}
        />
        <SentimentSatisfiedAltIcon sx={{ color: "darkgreen" }} />
      </Stack>
    </>
  );
}
