import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { allQuestions, Question } from "./helpers";

interface Props {
  children: ReactNode;
}

export interface QuestionType extends Question {
  id: number;
  answer: number;
}

interface QuestionsState {
  questions: QuestionType[];
  page: number;
}

const initialState: QuestionsState = {
  questions: allQuestions.map((question, index) => ({
    id: index,
    answer: 3,
    ...question,
  })),
  page: 1,
};

interface SetQuestionAction {
  type: "SetQuestionAction";
  id: number;
  answer: number;
}

interface SetPageAction {
  type: "SetPageAction";
  page: number;
}

type QuestionAction = SetQuestionAction | SetPageAction;

export const reducer = (
  state: QuestionsState,
  action: QuestionAction
): QuestionsState => {
  switch (action.type) {
    case "SetQuestionAction":
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id === action.id) {
            return {
              ...q,
              answer: action.answer,
            };
          } else {
            return q;
          }
        }),
      };
    case "SetPageAction":
      return {
        ...state,
        page: action.page,
      };
  }
};

export const QuestionsContext = createContext<{
  state: QuestionsState;
  dispatch: Dispatch<QuestionAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function QuestionsProvider({ children }: Props): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions(): {
  state: QuestionsState;
  dispatch: Dispatch<QuestionAction>;
} {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("must use within provider");
  }
  return context;
}
