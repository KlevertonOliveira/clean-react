import { SurveyListPage } from "@/presentation/pages";
import { makeRemoteLoadSurveyList } from "@/main/factories/usecases";

export default function MakeSurveyListPage(): React.JSX.Element {
  return (
    <SurveyListPage loadSurveyList={makeRemoteLoadSurveyList()} />
  );
}