import { createContext } from 'react'

/**
 * AAKAR — App shell context
 *
 * Small, UI-only global state: the mobile navigation drawer, the search panel
 * and the device/motion capabilities that gate animation and 3D. Business data
 * does NOT belong here — it arrives through hooks and services.
 */
export const AppContext = createContext(null)

export default AppContext
