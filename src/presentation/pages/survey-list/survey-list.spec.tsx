import { render, screen } from "@testing-library/react";
import { SurveyListPage } from "@/presentation/pages";

describe('SurveyList Component', () => {
  test('Should present 4 skeleton items on start', () => {
    render(<SurveyListPage />);
    const surveyList = screen.getByTestId("survey-list");
    const listItems = surveyList.getElementsByTagName("li");
    expect(listItems).toHaveLength(4);
  });
});