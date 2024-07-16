import { Typography, Container } from "@mui/material";
import { ReactElement } from "react";
import Section from "./Section";
import calculateAnswers from "./calculate";
import { QuestionsProvider } from "../libs/QuestionsProvider";

export default function Main(): ReactElement {
  // function calculate() {
  //   const results = calculateAnswers(
  //     answers1,
  //     answers2,
  //     answers3,
  //     answers4,
  //     answers5,
  //     answers6,
  //     answers7,
  //     answers8,
  //     answers9,
  //     answers10,
  //     answers11,
  //     answers12
  //   );
  //   console.log(results);
  // }

  return (
    <QuestionsProvider>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom>
          The Dark Side of Leadership
        </Typography>
        <Section />
      </Container>
    </QuestionsProvider>
  );
}
