import { Component } from 'react'
import { Notice } from '../ui/Notice.jsx'
import { Button } from '../ui/Button.jsx'

/**
 * AAKAR — ErrorBoundary
 *
 * Catches render failures (a broken 3D scene, a bad record) and shows the
 * designed fallback instead of a white screen. Global, in App.jsx.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[AAKAR] Render error:', error, info)
    }
  }

  render() {
    const { error } = this.state

    if (!error) return this.props.children

    return (
      <section className="aakar-section aakar-container" data-theme="light">
        <Notice
          kicker="Error 500"
          title="This view could not be rendered."
          tone="error"
          action={
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Reload the atelier
            </Button>
          }
        >
          Something in this section failed to load. The rest of the site is unaffected.
        </Notice>
      </section>
    )
  }
}

export default ErrorBoundary
