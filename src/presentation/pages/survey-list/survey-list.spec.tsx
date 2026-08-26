import { render, screen } from "@testing-library/react";
import { SurveyListPage } from "@/presentation/pages";

const makeSut = (): void => {
  render(<SurveyListPage />);
};

describe('SurveyList Component', () => {
  test('Should present 4 skeleton items on start', () => {
    makeSut();

    const surveyList = screen.getByTestId("survey-list");
    const listItems = surveyList.getElementsByTagName("li");

    expect(listItems).toHaveLength(4);
  });
});