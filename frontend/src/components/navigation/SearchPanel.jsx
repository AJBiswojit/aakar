import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useApp } from '../../hooks/useApp.js'

/**
 * AAKAR — SearchPanel
 *
 * Search foundation: a full-width obsidian panel that hands the query to the
 * collection route as `?q=`. Indexing, suggestions and fuzzy matching belong to
 * the store phase — this exists so navigation and keyboard behaviour (Escape,
 * focus, scroll lock) are already correct.
 */
export function SearchPanel() {
  const { isSearchOpen, closeSearch } = useApp()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('')
      return undefined
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeSearch()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchOpen, closeSearch])

  if (!isSearchOpen) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    const term = query.trim()
    closeSearch()
    navigate(term ? `/collection?q=${encodeURIComponent(term)}` : '/collection')
  }

  return (
    <div className="aakar-search" data-theme="dark" role="dialog" aria-modal="true" aria-label="Search the catalogue">
      <div className="aakar-search__inner aakar-container">
        <div className="aakar-search__bar">
          <span className="aakar-label aakar-search__label">Search the catalogue</span>
          <button
            type="button"
            className="aakar-search__close"
            onClick={closeSearch}
            aria-label="Close search"
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <form className="aakar-search__form" onSubmit={handleSubmit} role="search">
          <label className="aakar-visually-hidden" htmlFor="aakar-search-input">
            Search products, categories and tags
          </label>
          <input
            id="aakar-search-input"
            ref={inputRef}
            className="aakar-search__input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Characters, creatures, props…"
            autoComplete="off"
          />
          <button type="submit" className="aakar-search__submit aakar-label">
            Enter
          </button>
        </form>

        <p className="aakar-search__note">
          Full catalogue search, filters and suggestions arrive with the store phase.
          For now a query takes you to the collection index.
        </p>
      </div>
    </div>
  )
}

export default SearchPanel
