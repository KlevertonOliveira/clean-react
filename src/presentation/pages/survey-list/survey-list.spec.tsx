import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnexpectedError } from "@/domain/errors";
import { SurveyListPage } from "@/presentation/pages";
import { LoadSurveyListSpy } from "@/presentation/test";

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

  test("Should call LoadSurveyList on refetch", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    vi.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(new UnexpectedError());

    makeSut(loadSurveyListSpy);

    expect(await screen.findByTestId("error-message")).toBeInTheDocument();

    userEvent.setup();
    await userEvent.click(screen.getByTestId("retry-button"));

    // With the error mocked above, the callsCount was never updated since the loadAll failed.
    // Thus, as the retry button calls loadAll again (now without error), the callsCount should be 1
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});