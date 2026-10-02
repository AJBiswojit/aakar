import { Component } from 'react'

/**
 * AAKAR — ModelBoundary
 *
 * A failing GLB must never take the scene down. This boundary catches load and
 * parse errors from useGLTF() and renders the supplied fallback instead, so a
 * missing or corrupted asset degrades into the designed plate.
 */
export class ModelBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn('[AAKAR] 3D model could not be loaded, using fallback:', error?.message)
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}

export default ModelBoundary
