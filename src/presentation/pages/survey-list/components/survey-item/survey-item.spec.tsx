import { render, screen } from "@testing-library/react";
import { mockSurveyModel } from "@/domain/test/mock-survey-list";
import SurveyItem from "./survey-item";

describe("SurveyItem Component", () => {
  test("Should render with correct values (survey not answered)", () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date("2026-01-27T11:12:19.939Z")
    });

    render(<SurveyItem survey={survey} />);

    expect(screen.getByTestId("question-mark-icon")).toBeInTheDocument();
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("27");
    expect(screen.getByTestId("month")).toHaveTextContent("Jan");
    expect(screen.getByTestId("year")).toHaveTextContent("2026");
  });

  test("Should render with correct values (survey answered)", () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date("2025-03-04T11:12:19.939Z")
    });

    render(<SurveyItem survey={survey} />);

    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("04");
    expect(screen.getByTestId("month")).toHaveTextContent("Mar");
    expect(screen.getByTestId("year")).toHaveTextContent("2025");
  });
});