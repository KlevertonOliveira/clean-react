export default function SurveyItemSkeleton() {
  return (
    <li
      className="h-60 bg-white flex flex-col justify-between rounded-lg sm:basis-[48%] mb-6 shadow-md animate-pulse"
      data-testid="skeleton-survey-item"
    >
      <div className="flex gap-8 grow items-center">
        <div className="bg-disabled-background rounded-lg ml-4 w-20 h-25" />

        <div className="w-full flex flex-col gap-2 mr-4">
          <div className="h-3 w-3/4 bg-disabled-background" />
          <div className="h-3 w-2/3 bg-disabled-background" />
          <div className="h-3 w-5/6 bg-disabled-background" />
        </div>
      </div>

      <div className="bg-disabled-background rounded-b-lg  h-10" />
    </li>
  );
}