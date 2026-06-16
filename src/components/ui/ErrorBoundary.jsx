import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error(`[ErrorBoundary - ${this.props.name || 'unknown'}]:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      // Show a visible error message in development
      return (
        <div style={{
          padding: '20px',
          margin: '10px',
          background: 'rgba(194, 52, 52, 0.15)',
          border: '1px solid rgba(194, 52, 52, 0.3)',
          borderRadius: '12px',
          color: '#f08080',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            ⚠ Error in {this.props.name || 'component'}
          </p>
          <p style={{ opacity: 0.7, fontSize: '12px' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
