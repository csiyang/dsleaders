import {
  Typography,
  Container,
  Stack,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Zoom,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { ReactElement, useState } from "react";
import Section from "./Section";
import { QuestionsProvider } from "../libs/QuestionsProvider";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";

export default function Main(): ReactElement {
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  const handleOpenInstructions = () => {
    setInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setInstructionsOpen(false);
  };

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
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  letterSpacing: { xs: "0.05em", md: "0.08em" },
                }}
              >
                The Dark Side of Leadership
              </Typography>
              <IconButton
                onClick={handleOpenInstructions}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "white",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.25)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <InfoIcon />
              </IconButton>
            </Box>
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

      <Dialog
        open={instructionsOpen}
        onClose={handleCloseInstructions}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        transitionDuration={400}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "24px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(240,235,255,0.98) 100%)",
            boxShadow: "0 20px 40px rgba(118, 75, 162, 0.3)",
            border: "2px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
            transformOrigin: "75% 15%",
          },
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(118, 75, 162, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#764ba2",
            fontWeight: 700,
            fontSize: "1.5rem",
            textAlign: "center",
            pb: 1,
            position: "relative",
          }}
        >
          📋 Instructions
          <IconButton
            onClick={handleCloseInstructions}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#764ba2",
              "&:hover": {
                background: "rgba(118, 75, 162, 0.1)",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#764ba2",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Identifying Your Dark Side
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4a4a7a",
                  lineHeight: 1.6,
                }}
              >
                As our dark side develops over our lifetime – the results of our
                unique family of origin, traumatic experiences, and the way we
                processed them – it begins to take on a specific shape. The
                various characteristics of the dark side can be grouped into
                some broad categories. Even though these five categories may not
                account for every possible related issue we face, they can
                provide the general framework we need to begin the process of
                understanding and overcoming our unique dark side.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#764ba2",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Giving Shape to Our Dark Side
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4a4a7a",
                  lineHeight: 1.6,
                }}
              >
                On the &ldquo;Questions&rdquo; sheet you will find twelve groups
                of five statements lettered A through E. Each question has a
                possible range of responses (see &ldquo;Scoring Guide&rdquo;).
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4a4a7a",
                  lineHeight: 1.6,
                  mt: 2,
                }}
              >
                Read each statement and write down the number that most closely
                corresponds to the impressions of yourself. If you are serious
                about identifying your dark side and intent on preventing
                significant failure in your leadership, it is absolutely vital
                that you answer each question as honestly as possible. Again,
                remember as you respond that the current of self-deception and
                denial runs deep and swift in our lives. We will be tempted to
                respond to some less flattering questions in ways that we wish
                were true, but deep down we know they are not. If we succumb to
                this temptation, our dark side is victimizing us.
              </Typography>
            </Box>

            <Box
              sx={{
                background:
                  "linear-gradient(135deg, rgba(196, 113, 237, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)",
                borderRadius: "16px",
                padding: 3,
                border: "1px solid rgba(196, 113, 237, 0.2)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#764ba2",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Scoring Guide
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body1" sx={{ color: "#4a4a7a" }}>
                  <strong>1</strong> = strongly disagree
                </Typography>
                <Typography variant="body1" sx={{ color: "#4a4a7a" }}>
                  <strong>2</strong> = disagree
                </Typography>
                <Typography variant="body1" sx={{ color: "#4a4a7a" }}>
                  <strong>3</strong> = uncertain
                </Typography>
                <Typography variant="body1" sx={{ color: "#4a4a7a" }}>
                  <strong>4</strong> = agree
                </Typography>
                <Typography variant="body1" sx={{ color: "#4a4a7a" }}>
                  <strong>5</strong> = strongly agree
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseInstructions}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "16px",
              py: 1.5,
              px: 4,
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              background: "linear-gradient(45deg, #c471ed, #764ba2)",
              color: "white",
              boxShadow: "0 4px 12px rgba(118, 75, 162, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(118, 75, 162, 0.4)",
                background: "linear-gradient(45deg, #764ba2, #c471ed)",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </QuestionsProvider>
  );
}
