import { Typography, Container, Stack } from "@mui/material";
import { ReactElement } from "react";
import Section from "./Section";
import { QuestionsProvider } from "../libs/QuestionsProvider";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";

export default function Main(): ReactElement {
  return (
    <QuestionsProvider>
      <Container maxWidth="md">
        <Stack gap={2}>
          <Typography variant="h3">The Dark Side of Leadership</Typography>
          <Progress />
          <Section />
          <NavigationButtons />
        </Stack>
      </Container>
    </QuestionsProvider>
  );
}
