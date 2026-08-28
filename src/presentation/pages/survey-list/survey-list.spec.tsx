import { render, screen } from "@testing-library/react";
import { SurveyListPage } from "@/presentation/pages";
import type { LoadSurveyList } from "@/domain/usecases";
import type { SurveyModel } from "@/domain/models";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};


const makeSut = (): SutTypes => {
  const queryClient = new QueryClient();
  const loadSurveyListSpy = new LoadSurveyListSpy();

  render(
    <QueryClientProvider client={queryClient}>
      <SurveyListPage loadSurveyList={loadSurveyListSpy} />
    </QueryClientProvider>
  );

  return {
    loadSurveyListSpy
  };
};

describe('SurveyList Component', () => {
  test('Should present 4 skeleton items on start', () => {
    makeSut();

    const listItems = screen.getAllByTestId("skeleton-survey-item");

    expect(listItems).toHaveLength(4);
  });

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});