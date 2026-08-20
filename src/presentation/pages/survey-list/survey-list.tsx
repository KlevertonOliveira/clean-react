import { Footer, Header } from "@/presentation/components";
import SurveyItem from "./components/survey-item";
import SurveyItemSkeleton from "./components/survey-item-skeleton";

export default function SurveyListPage() {
  return (
    <div className="flex flex-col min-h-screen h-full justify-between bg-disabled-background"
    >
      <Header />

      <div className="flex flex-col self-center max-w-200 grow w-full px-5 py-10">
        <h2 className="text-primaryDark text-xl font-bold uppercase mb-6">
          Surveys
        </h2>

        <ul className="flex flex-col sm:flex-row flex-wrap justify-between">
          <SurveyItem />
          <SurveyItemSkeleton />
        </ul>
      </div>

      <Footer />
    </div>
  );
}
