import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * AAKAR — useAsync
 *
 * Minimal async state primitive for the service layer: status, data, error and
 * a manual `refetch`. Deliberately not a data-fetching library — no cache, no
 * dedupe, no polling — until the backend genuinely requires it.
 *
 * Handles the two things that always go wrong: state updates after unmount,
 * and out-of-order responses when the input changes mid-flight.
 *
 * @param {(...args: any[]) => Promise<any>} asyncFunction
 * @param {any[]} deps
 * @param {{ initialData?: any, enabled?: boolean }} [options]
 */
export function useAsync(asyncFunction, deps = [], options = {}) {
  const { initialData = null, enabled = true } = options

  const [state, setState] = useState({
    data: initialData,
    error: null,
    status: enabled ? 'loading' : 'idle',
  })

  const mountedRef = useRef(true)
  const requestRef = useRef(0)
  const functionRef = useRef(asyncFunction)
  functionRef.current = asyncFunction

  const run = useCallback(async (...args) => {
    const requestId = requestRef.current + 1
    requestRef.current = requestId

    setState((previous) => ({ ...previous, status: 'loading', error: null }))

    try {
      const data = await functionRef.current(...args)
      if (!mountedRef.current || requestId !== requestRef.current) return undefined
      setState({ data: data ?? null, error: null, status: 'success' })
      return data
    } catch (error) {
      if (!mountedRef.current || requestId !== requestRef.current) return undefined
      setState({ data: null, error, status: 'error' })
      return undefined
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setState((previous) => ({ ...previous, status: 'idle' }))
      return
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled])

  return {
    data: state.data,
    error: state.error,
    status: state.status,
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isEmpty:
      state.status === 'success' &&
      (state.data == null || (Array.isArray(state.data) && state.data.length === 0)),
    refetch: run,
  }
}

export default useAsync
