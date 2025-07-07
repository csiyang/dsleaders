import { ReactElement, useState, useRef, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Result } from "../libs/calculateResults";
import {
  Box,
  Stack,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { startCase } from "lodash";
import jsPDF from "jspdf";

interface Props {
  results: Result[];
}

export default function ResultsGraph({ results }: Props): ReactElement {
  const [selectedTab, setSelectedTab] = useState("Summary");
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when tab changes
  useEffect(() => {
    if (desktopContentRef.current) {
      desktopContentRef.current.scrollTop = 0;
    }
    if (mobileContentRef.current) {
      mobileContentRef.current.scrollTop = 0;
    }
  }, [selectedTab]);

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;

    // Helper function to add text with word wrapping
    const addText = (
      text: string,
      fontSize: number,
      isBold = false,
      isCenter = false
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");

      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);

      lines.forEach((line: string) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 30;
        }

        const xPosition = isCenter ? pageWidth / 2 : margin;
        doc.text(line, xPosition, yPosition, {
          align: isCenter ? "center" : "left",
        });
        yPosition += fontSize * 0.5;
      });

      yPosition += 5;
    };

    // Title
    addText("The Dark Side of Leadership - Assessment Results", 18, true, true);
    yPosition += 10;

    // Primary Result
    addText(`Primary Leadership Type: ${startCase(primaryCategory)}`, 14, true);
    yPosition += 5;

    // Tied categories if any
    if (tiedCategories.length > 0) {
      addText(
        `Tied with: ${tiedCategories.map((cat) => startCase(cat)).join(", ")}`,
        12
      );
      yPosition += 5;
    }

    // All results in order
    const sortedResults = [...results].sort((a, b) => b.result - a.result);
    addText("Complete Results (Highest to Lowest):", 14, true);

    sortedResults.forEach((result) => {
      addText(`${startCase(result.category)}: ${result.result}/12`, 12);
    });

    yPosition += 15;

    // Add separator line
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Category descriptions header
    addText("Leadership Category Descriptions", 16, true, true);
    yPosition += 10;

    // Category descriptions
    const categoryData = {
      Compulsive: {
        title: "THE COMPULSIVE LEADER",
        subtitle: "Control",
        points: [
          "Control",
          "Perfectionism",
          "Routines, order, systems",
          "Status conscious",
          "Look for reassurance and approval of authority figures",
          "Anxious when unsure of performance or standing",
          "Pursuit of excellence in ministry that crosses line to obsessive perfectionism",
          "Identity closely tied to performance",
        ],
      },
      Narcissistic: {
        title: "THE NARCISSISTIC LEADER",
        subtitle: "Axis of Self",
        points: [
          "The world revolves around the axis of self",
          "Need for constant attention",
          "Overestimate own achievements",
          "Overinflated sense of importance to the organisation",
          "Struggles to recognise contributions of others",
          "Use others to advance own goals",
          "Internally uncertain of themselves and dissatisfied with accomplishments",
          "Driven to take on ambitious, grand and costly projects",
        ],
      },
      Paranoid: {
        title: "THE PARANOID LEADER",
        subtitle: "Fear",
        points: [
          "Afraid of anything new or anyone",
          "Suspicious",
          "Guarded",
          "Hypersensitive to people's actions and comments",
          "Overreacts to even mildest forms of criticism",
          "Insecure in own abilities",
          "Jealous of other gifted people",
          "Difficulty developing and maintaining close relationships",
          "Creates rigid structures, systems, and reporting to control and limit autonomy of others",
        ],
      },
      Codependent: {
        title: "THE CODEPENDENT LEADER",
        subtitle: "Peacemaker",
        points: [
          "Seeks to keep the peace; peacemaker",
          "Develops coping behaviours for covering up",
          "Tendency to react rather than initiate action",
          "Takes personal responsibility for the actions and emotions of others, often blaming themselves",
          "Worry about the feelings of others",
          "Unhealthy drive to ease the pain of others",
          "Difficulty coping with the behaviours and expectations of those around them",
          "Hesitant to speak truth for fear of hurting a person's feelings",
        ],
      },
      "Passive Aggressive": {
        title: "THE PASSIVE-AGGRESSIVE LEADER",
        subtitle: "Resist",
        points: [
          "Resist demands to adequately perform tasks",
          "Procrastination, dawdling, stubbornness, forgetfulness, intentional inefficiency ... as means of controlling their environment or those around them",
          "Fear of failure ... and fear of success",
          "Short outbursts expressing intense emotions",
          "Pessimistic outlook",
          "Quick to complain",
          "Perform tasks but with little or no enthusiasm",
          "Appear to be happy but harbour anger or bitterness",
          "Impatience, irritability, fidgeting when things aren't going their way",
        ],
      },
    };

    // Add each category description
    Object.values(categoryData).forEach((category) => {
      addText(category.title, 14, true);
      addText(`Key Theme: ${category.subtitle}`, 12, true);

      category.points.forEach((point) => {
        addText(`• ${point}`, 10);
      });

      yPosition += 10;
    });

    // Save the PDF
    doc.save("leadership-assessment-results.pdf");
  };

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

  // Create button list: Summary + all categories
  const buttonList = ["Summary", ...results.map((r) => startCase(r.category))];

  const renderContent = () => {
    if (selectedTab === "Summary") {
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
                Tied with:{" "}
                {tiedCategories.map((cat) => startCase(cat)).join(", ")}
              </Typography>
            )}

            {/* Download Button */}
            <Button
              onClick={generatePDF}
              variant="contained"
              startIcon={<Download />}
              sx={{
                mt: 3,
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(45deg, #764ba2, #c471ed)",
                color: "white",
                border: "none",
                "&:hover": {
                  background: "linear-gradient(45deg, #c471ed, #764ba2)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Download Complete Results
            </Button>
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
                  dot={{
                    fill: "#764ba2",
                    stroke: "#c471ed",
                    strokeWidth: 2,
                    r: 6,
                  }}
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
    } else {
      // Individual category content
      const getContent = () => {
        switch (selectedTab) {
          case "Compulsive":
            return {
              title: "THE COMPULSIVE LEADER",
              subtitle: "Control",
              points: [
                "Control",
                "Perfectionism",
                "Routines, order, systems",
                "Status conscious",
                "Look for reassurance and approval of authority figures",
                "Anxious when unsure of performance or standing",
                "Pursuit of excellence in ministry that crosses line to obsessive perfectionism",
                "Identity closely tied to performance",
              ],
            };
          case "Narcissistic":
            return {
              title: "THE NARCISSISTIC LEADER",
              subtitle: "Axis of Self",
              points: [
                "The world revolves around the axis of self",
                "Need for constant attention",
                "Overestimate own achievements",
                "Overinflated sense of importance to the organisation",
                "Struggles to recognise contributions of others",
                "Use others to advance own goals",
                "Internally uncertain of themselves and dissatisfied with accomplishments",
                "Driven to take on ambitious, grand and costly projects",
              ],
            };
          case "Paranoid":
            return {
              title: "THE PARANOID LEADER",
              subtitle: "Fear",
              points: [
                "Afraid of anything new or anyone",
                "Suspicious",
                "Guarded",
                "Hypersensitive to people's actions and comments",
                "Overreacts to even mildest forms of criticism",
                "Insecure in own abilities",
                "Jealous of other gifted people",
                "Difficulty developing and maintaining close relationships",
                "Creates rigid structures, systems, and reporting to control and limit autonomy of others",
              ],
            };
          case "Codependent":
            return {
              title: "THE CODEPENDENT LEADER",
              subtitle: "Peacemaker",
              points: [
                "Seeks to keep the peace; peacemaker",
                "Develops coping behaviours for covering up",
                "Tendency to react rather than initiate action",
                "Takes personal responsibility for the actions and emotions of others, often blaming themselves",
                "Worry about the feelings of others",
                "Unhealthy drive to ease the pain of others",
                "Difficulty coping with the behaviours and expectations of those around them",
                "Hesitant to speak truth for fear of hurting a person's feelings",
              ],
            };
          case "Passive Aggressive":
            return {
              title: "THE PASSIVE-AGGRESSIVE LEADER",
              subtitle: "Resist",
              points: [
                "Resist demands to adequately perform tasks",
                "Procrastination, dawdling, stubbornness, forgetfulness, intentional inefficiency ... as means of controlling their environment or those around them",
                "Fear of failure ... and fear of success",
                "Short outbursts expressing intense emotions",
                "Pessimistic outlook",
                "Quick to complain",
                "Perform tasks but with little or no enthusiasm",
                "Appear to be happy but harbour anger or bitterness",
                "Impatience, irritability, fidgeting when things aren't going their way",
              ],
            };
          default:
            return {
              title: selectedTab,
              subtitle: "",
              points: ["Content for this category will be added here."],
            };
        }
      };

      const content = getContent();

      return (
        <Box
          sx={{
            padding: 4,
          }}
        >
          <Box
            sx={{
              mb: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#764ba2",
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(45deg, #c471ed, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", md: "2.5rem" },
              }}
            >
              {content.title}
            </Typography>
            {content.subtitle && (
              <Typography
                variant="h6"
                sx={{
                  color: "#6a4c93",
                  fontWeight: 600,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                }}
              >
                {content.subtitle}
              </Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "left" }}>
            {content.points.map((point, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#764ba2",
                    fontWeight: 700,
                    mr: 2,
                    mt: 0.5,
                    fontSize: "1.2rem",
                  }}
                >
                  •
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#4a4a7a",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    flex: 1,
                  }}
                >
                  {point}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {/* Desktop/Tablet Layout - Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 3,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Fixed Sidebar with 6 buttons */}
        <Stack
          spacing={1}
          sx={{
            minWidth: "180px",
            height: "100%",
            flexShrink: 0,
            display: "flex",
          }}
        >
          {buttonList.map((buttonName) => (
            <Button
              key={buttonName}
              onClick={() => setSelectedTab(buttonName)}
              variant={selectedTab === buttonName ? "contained" : "outlined"}
              sx={{
                flex: 1,
                py: 2,
                textTransform: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...(selectedTab === buttonName
                  ? buttonName === "Summary"
                    ? {
                        // Light orange gradient for Summary button when selected (desktop only)
                        background:
                          "linear-gradient(45deg, rgba(255, 235, 225, 0.9), rgba(255, 220, 200, 0.95))",
                        color: "#ee5a24",
                        border: "1px solid rgba(238, 90, 36, 0.4)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, rgba(255, 220, 200, 0.95), rgba(255, 200, 170, 1))",
                        },
                      }
                    : {
                        // Purple gradient for other buttons
                        background: "linear-gradient(45deg, #c471ed, #764ba2)",
                        color: "white",
                        border: "none",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #764ba2, #c471ed)",
                        },
                      }
                  : buttonName === "Summary"
                  ? {
                      // Orange outline for Summary button when unselected (desktop only)
                      color: "#ee5a24",
                      border: "1px solid rgba(238, 90, 36, 0.3)",
                      background: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        background: "rgba(238, 90, 36, 0.1)",
                        border: "1px solid rgba(238, 90, 36, 0.5)",
                      },
                    }
                  : {
                      // Purple outline for other buttons
                      color: "#764ba2",
                      border: "1px solid rgba(196, 113, 237, 0.3)",
                      background: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        background: "rgba(196, 113, 237, 0.1)",
                        border: "1px solid rgba(196, 113, 237, 0.5)",
                      },
                    }),
              }}
            >
              {buttonName}
            </Button>
          ))}
        </Stack>

        {/* Scrollable content area */}
        <Box
          ref={desktopContentRef}
          sx={{
            flex: 1,
            height: "100%",
            overflow: "auto",
          }}
        >
          {renderContent()}
        </Box>
      </Box>

      {/* Mobile Layout - Dropdown */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: 2,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Dropdown Menu */}
        <FormControl
          sx={{
            background: "rgba(255,255,255,0.7)",
            borderRadius: "12px",
          }}
        >
          <Select
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
            sx={{
              fontWeight: 600,
              color: "#764ba2",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid rgba(196, 113, 237, 0.3)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "1px solid rgba(196, 113, 237, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #c471ed",
              },
            }}
          >
            {buttonList.map((buttonName) => (
              <MenuItem key={buttonName} value={buttonName}>
                {buttonName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Scrollable content area */}
        <Box
          ref={mobileContentRef}
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
