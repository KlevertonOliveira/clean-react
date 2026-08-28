import { render, screen } from "@testing-library/react";
import { SurveyListPage } from "@/presentation/pages";
import type { LoadSurveyList } from "@/domain/usecases";
import type { SurveyModel } from "@/domain/models";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockSurveyList } from "@/domain/test";
import { UnexpectedError } from "@/domain/errors";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyList();

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};


const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

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
  test('Should present 4 skeleton items on start', async () => {
    makeSut();
    const listItems = screen.getAllByTestId("skeleton-survey-item");
    expect(listItems).toHaveLength(4);
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
  });

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });

  test("Should render SurveyItems on success", async () => {
    makeSut();
    const surveyItems = await screen.findAllByTestId("survey-item");
    expect(surveyItems).toHaveLength(3);
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
  });

  test("Should render error message on failure", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    vi.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);

    expect(await screen.findByTestId("error-message")).toHaveTextContent(error.message);
    expect(screen.queryByTestId("survey-list")).not.toBeInTheDocument();
  });
});