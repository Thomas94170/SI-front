import React from 'react';

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("💥 Caught by ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <p>Une erreur est survenue.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
