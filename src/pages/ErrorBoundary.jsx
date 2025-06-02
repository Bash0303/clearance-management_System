import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-600 mb-4">
                ⚠️ Something Went Wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but an unexpected error occurred. Please try refreshing the page.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="mb-6 text-left">
                  <summary className="text-red-500 cursor-pointer mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <code className="text-sm text-red-600 block mb-2">
                      {this.state.error?.toString()}
                    </code>
                    <pre className="text-xs text-gray-600 overflow-auto max-h-64">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              <button
                onClick={this.handleReset}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Try Again
              </button>
              
              {this.props.contactSupport && (
                <p className="mt-6 text-sm text-gray-500">
                  If the problem persists, please contact support.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  contactSupport: PropTypes.bool,
  onReset: PropTypes.func
};

ErrorBoundary.defaultProps = {
  contactSupport: true
};

export default ErrorBoundary;