type Props = {
  error: Error;
};

export default function SurveyFetchError({ error }: Props) {
  return (
    <div>
      <span data-testid="error-message">{error.message}</span>
      <button>Refetch</button>
    </div>
  );
}