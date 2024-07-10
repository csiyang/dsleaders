import { Typography, Container } from "@mui/material";
import { ReactElement, useState } from "react";
import {
  set1,
  set2,
  set3,
  set4,
  set5,
  set6,
  set7,
  set8,
  set9,
  set10,
  set11,
  set12,
} from "./data";
import Section from "./Section";
import calculateAnswers from "./calculate";

export default function Main(): ReactElement {
  const [answers1, setAnswers1] = useState<number[]>([]);
  const [answers2, setAnswers2] = useState<number[]>([]);
  const [answers3, setAnswers3] = useState<number[]>([]);
  const [answers4, setAnswers4] = useState<number[]>([]);
  const [answers5, setAnswers5] = useState<number[]>([]);
  const [answers6, setAnswers6] = useState<number[]>([]);
  const [answers7, setAnswers7] = useState<number[]>([]);
  const [answers8, setAnswers8] = useState<number[]>([]);
  const [answers9, setAnswers9] = useState<number[]>([]);
  const [answers10, setAnswers10] = useState<number[]>([]);
  const [answers11, setAnswers11] = useState<number[]>([]);
  const [answers12, setAnswers12] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const groupList = [
    {
      id: 1,
      questions: set1,
      setAnswers: setAnswers1,
    },
    {
      id: 2,
      questions: set2,
      setAnswers: setAnswers2,
    },
    {
      id: 3,
      questions: set3,
      setAnswers: setAnswers3,
    },
    {
      id: 4,
      questions: set4,
      setAnswers: setAnswers4,
    },
    {
      id: 5,
      questions: set5,
      setAnswers: setAnswers5,
    },
    {
      id: 6,
      questions: set6,
      setAnswers: setAnswers6,
    },
    {
      id: 7,
      questions: set7,
      setAnswers: setAnswers7,
    },
    {
      id: 8,
      questions: set8,
      setAnswers: setAnswers8,
    },
    {
      id: 9,
      questions: set9,
      setAnswers: setAnswers9,
    },
    {
      id: 10,
      questions: set10,
      setAnswers: setAnswers10,
    },
    {
      id: 11,
      questions: set11,
      setAnswers: setAnswers11,
    },
    {
      id: 12,
      questions: set12,
      setAnswers: setAnswers12,
    },
  ];

  function calculate() {
    const results = calculateAnswers(
      answers1,
      answers2,
      answers3,
      answers4,
      answers5,
      answers6,
      answers7,
      answers8,
      answers9,
      answers10,
      answers11,
      answers12
    );
    console.log(results);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        The Dark Side of Leadership
      </Typography>
      {groupList.map(({ id, questions, setAnswers }) => {
        if (id === page) {
          return (
            <Section
              key={id}
              questions={questions}
              setAnswers={setAnswers}
              page={page}
              setPage={setPage}
              calculate={calculate}
            />
          );
        }
        return <></>;
      })}
    </Container>
  );
}
