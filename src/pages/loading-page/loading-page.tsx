import './loading-page.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="spinner" data-testid="loading-container"></div>
  );
}

export default LoadingScreen;
