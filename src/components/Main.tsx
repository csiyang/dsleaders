import { Typography, Container, Stack, Box } from "@mui/material";
import { ReactElement } from "react";
import Section from "./Section";
import { QuestionsProvider } from "../libs/QuestionsProvider";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";

export default function Main(): ReactElement {
  return (
    <QuestionsProvider>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #c471ed 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(200, 113, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            py: 3,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Stack gap={3} sx={{ height: "100%", overflow: "hidden" }}>
            <Typography
              variant="h3"
              sx={{
                flexShrink: 0,
                color: "white",
                fontWeight: 600,
                textAlign: "center",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                letterSpacing: { xs: "0.05em", md: "0.08em" },
              }}
            >
              The Dark Side of Leadership
            </Typography>
            <Box sx={{ flexShrink: 0 }}>
              <Progress />
            </Box>
            <Section />
            <Box sx={{ flexShrink: 0 }}>
              <NavigationButtons />
            </Box>
          </Stack>
        </Container>
      </Box>
    </QuestionsProvider>
  );
}
