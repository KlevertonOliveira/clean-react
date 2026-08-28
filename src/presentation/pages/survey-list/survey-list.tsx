import { useQuery } from "@tanstack/react-query";
import { Footer, Header } from "@/presentation/components";
import type { LoadSurveyList } from "@/domain/usecases";
import SurveyItemSkeleton from "./components/survey-item-skeleton/survey-item-skeleton";
import SurveyItem from "./components/survey-item/survey-item";

type Props = {
  loadSurveyList: LoadSurveyList;
};

export default function SurveyListPage({ loadSurveyList }: Props) {
  const {
    data: surveyList,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["load-survey-list"],
    queryFn: async () => loadSurveyList.loadAll(),
    initialData: [],
  });

  return (
    <div className="flex flex-col min-h-screen h-full justify-between bg-disabled-background">
      <Header />

      <div className="flex flex-col self-center max-w-200 grow w-full px-5 py-10">
        <h2 className="text-primaryDark text-xl font-bold uppercase mb-6">
          Surveys
        </h2>

        {(!isFetching && isError) && (
          <div>
            <span data-testid="error-message">{error.message}</span>
            <button>Refetch</button>
          </div>
        )}

        {(isFetching || surveyList.length > 0) && (
          <ul className="flex flex-col sm:flex-row flex-wrap justify-between" data-testid="survey-list">
            {isFetching
              ? Array(4).fill("").map((_, index) => <SurveyItemSkeleton key={index} />)
              : surveyList.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
            }
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}
