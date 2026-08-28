type Props = {
  error: Error;
  onRetry: () => void;
};

export default function SurveyFetchError({ error, onRetry }: Props) {
  return (
    <div>
      <span data-testid="error-message">{error.message}</span>
      <button data-testid="retry-button" onClick={onRetry}>Retry</button>
    </div>
  );
}