import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useArtist } from '../../hooks/useArtist.js'
import { SectionHead } from '../common/SectionHead.jsx'
import { Plate } from '../ui/Plate.jsx'
import { Button } from '../ui/Button.jsx'
import { Notice } from '../ui/Notice.jsx'
import { Loader } from '../ui/Loader.jsx'
import { formatYear } from '../../utils/format.js'
import './FeaturedWork.css'

/**
 * AAKAR — FeaturedWork
 *
 * WHITE / INFORMATION. Selected work is exhibited as an editorial index, not a
 * card grid: a technical index number, a large title, one image, and the facts
 * about how it was made.
 *
 * Data: useArtist() → portfolio (work is exhibited, not sold — separate from
 * products by design).
 */
export function FeaturedWork({ limit = 3 }) {
  const { portfolio, isLoading, isError, refetch } = useArtist()
  const entries = portfolio.slice(0, limit)

  return (
    <section className="aakar-section aakar-work" data-theme="light" data-nav-theme="light" aria-labelledby="work-title">
      <div className="aakar-container">
        <SectionHead
          index="01"
          kicker="Selected Work"
          layout="split"
          title={<span id="work-title">Form, examined at one hundred percent.</span>}
          lead="Portfolio pieces are exhibited, not sold. Each one is delivered work or studio research, documented here with the discipline that produced it."
          action={
            <Button to="/studio" variant="line">
              View the portfolio
            </Button>
          }
        />

        {isLoading ? <Loader label="Loading selected work" /> : null}

        {isError ? (
          <Notice
            kicker="Unavailable"
            title="Selected work could not be retrieved."
            action={
              <Button variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          >
            The portfolio service did not respond. Nothing else on this page is affected.
          </Notice>
        ) : null}

        {!isLoading && !isError && entries.length === 0 ? (
          <Notice kicker="Archive empty" title="No work has been published yet.">
            The first portfolio pieces appear here as the atelier releases them.
          </Notice>
        ) : null}

        <ol className="aakar-work__index">
          {entries.map((entry, position) => (
            <li className="aakar-work__entry" key={entry.id} data-reveal="up">
              <Link className="aakar-work__link" to="/studio">
                <div className="aakar-work__head">
                  <span className="aakar-work__number" aria-hidden="true">
                    {String(position + 1).padStart(2, '0')}
                  </span>

                  <h3 className="aakar-work__title">{entry.title}</h3>

                  <p className="aakar-work__facts aakar-label">
                    {[entry.category, formatYear(entry.year ? `${entry.year}` : null), entry.status]
                      .filter(Boolean)
                      .join(' / ')}
                  </p>

                  <span className="aakar-work__open aakar-label">
                    Open work
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>

                <div className="aakar-work__media">
                  <Plate
                    src={entry.hero}
                    alt={`${entry.title} — ${entry.category} by AAKAR`}
                    label={`${entry.title} — plate pending`}
                    palette={entry.palette}
                    ratio="16 / 9"
                    sizes="(max-width: 900px) 100vw, 70vw"
                  />
                </div>

                <p className="aakar-work__excerpt">{entry.excerpt}</p>
                <p className="aakar-work__discipline aakar-label">{entry.discipline}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default FeaturedWork
