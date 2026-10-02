import { useContext } from 'react'
import { AppContext } from '../state/app/AppContext.js'

/**
 * AAKAR — useApp
 *
 * Shell state: overlay visibility plus device/motion capability.
 * Must be used inside <AppProvider> (mounted in App.jsx).
 */
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider.')
  }
  return context
}

export default useApp
