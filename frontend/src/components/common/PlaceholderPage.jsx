import { Link } from 'react-router-dom'
import { Kicker } from '../ui/Kicker.jsx'
import { Button } from '../ui/Button.jsx'
import { useReveal } from '../../hooks/useReveal.js'
import './PlaceholderPage.css'

/**
 * AAKAR — PlaceholderPage
 *
 * The deliberate statement for routes that are planned but not built yet. It
 * keeps the foundation honest: every route resolves, nothing pretends to be
 * finished, and each page still carries the brand's typography and structure.
 *
 * @param {Object} props
 * @param {string} props.index
 * @param {string} props.kicker
 * @param {string} props.title
 * @param {string} props.lead
 * @param {Array<{ id: string, label: string }>} [props.contents] what this route will hold
 */
export function PlaceholderPage({ index, kicker, title, lead, contents = [] }) {
  useReveal([title])

  return (
    <section className="aakar-placeholder aakar-container" data-theme="light" data-nav-theme="light">
      <Kicker index={index} data-reveal="fade">
        {kicker}
      </Kicker>

      <h1 className="aakar-placeholder__title" data-reveal="up">
        {title}
      </h1>

      <p className="aakar-placeholder__lead" data-reveal="up" data-reveal-delay="120">
        {lead}
      </p>

      <div className="aakar-placeholder__foot" data-reveal="up" data-reveal-delay="220">
        {contents.length > 0 ? (
          <div className="aakar-placeholder__contents">
            <p className="aakar-label aakar-placeholder__contents-title">Planned for this route</p>
            <ul className="aakar-placeholder__list">
              {contents.map((item) => (
                <li className="aakar-placeholder__item" key={item.id}>
                  <span className="aakar-placeholder__marker" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="aakar-placeholder__actions">
          <Button to="/" variant="primary">
            Return to the atelier
          </Button>
          <Button to="/collection" variant="line">
            Browse the catalogue
          </Button>
        </div>
      </div>

      <p className="aakar-placeholder__note" data-reveal="fade">
        Phase 0 — foundation. This route is routed, themed and responsive; its content
        arrives in a later phase. Read the notice under{' '}
        <Link to="/" className="aakar-underline">
          the homepage
        </Link>{' '}
        for what is already live.
      </p>
    </section>
  )
}

export default PlaceholderPage
