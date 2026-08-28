type Props = {
  children: React.ReactNode;
};

export default function SurveyList({ children }: Props) {
  return (
    <ul
      className="flex flex-col sm:flex-row flex-wrap justify-between"
      data-testid="survey-list"
    >
      {children}
    </ul>
  );
}