import { Typography, Container } from "@mui/material";
import { ReactElement } from "react";
import { set1 } from "./data";
import Section from "./Section";

export default function Main(): ReactElement {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        The Dark Side of Leadership
      </Typography>
      <Section questions={set1} />
    </Container>
  );
}
