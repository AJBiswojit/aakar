import { useArtist } from '../../hooks/useArtist.js'
import { SectionHead } from '../common/SectionHead.jsx'
import { Plate } from '../ui/Plate.jsx'
import { Parallax } from '../common/Parallax.jsx'
import { Button } from '../ui/Button.jsx'
import { Loader } from '../ui/Loader.jsx'
import './StudioIntro.css'

/**
 * AAKAR — StudioIntro
 *
 * BLACK / PORTFOLIO STORYTELLING. The artist's own voice: statement, the three
 * principles the work is made under, the tools, and the studio timeline.
 *
 * Single-owner by design — this section introduces one artist, never a team of
 * vendors or a marketplace of sellers.
 *
 * Data: useArtist() → artist.service.js.
 */
export function StudioIntro() {
  const { artist, isLoading } = useArtist()

  const philosophy = artist?.philosophy || []
  const timeline = artist?.timeline || []
  const tools = artist?.tools || []

  return (
    <section className="aakar-section aakar-studio" data-theme="dark" data-nav-theme="dark" aria-labelledby="studio-title">
      <div className="aakar-container aakar-studio__inner">
        <div className="aakar-studio__portrait">
          <Parallax speed={0.04}>
            <Plate
              src={artist?.studioImages?.[0]}
              alt={`${artist?.name || 'The artist'} in the AAKAR studio`}
              label="Studio portrait pending"
              palette={['#171A20', '#0A0B0E']}
              ratio="3 / 4"
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </Parallax>

          <p className="aakar-studio__caption aakar-label">
            {[artist?.location, artist?.founded ? `Since ${artist.founded}` : null]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>

        <div className="aakar-studio__body">
          <SectionHead
            index="04"
            kicker="The Studio"
            title={<span id="studio-title">One artist. One standard.</span>}
            lead={artist?.statement}
          />

          {isLoading ? <Loader label="Loading the studio record" /> : null}

          <ul className="aakar-studio__principles">
            {philosophy.map((principle) => (
              <li className="aakar-studio__principle" key={principle.id} data-reveal="up">
                <h3 className="aakar-studio__principle-title">{principle.title}</h3>
                <p className="aakar-studio__principle-body">{principle.body}</p>
              </li>
            ))}
          </ul>

          {tools.length > 0 ? (
            <div className="aakar-studio__tools">
              <p className="aakar-label aakar-studio__tools-label">Studio tools</p>
              <p className="aakar-studio__tools-list">{tools.join(' · ')}</p>
            </div>
          ) : null}

          <div className="aakar-studio__actions">
            <Button to="/about" variant="secondary">
              About the artist
            </Button>
            <Button to="/studio" variant="line">
              See the process
            </Button>
          </div>
        </div>
      </div>

      {timeline.length > 0 ? (
        <div className="aakar-container">
          <ol className="aakar-studio__timeline">
            {timeline.map((entry) => (
              <li className="aakar-studio__milestone" key={entry.year} data-reveal="up">
                <span className="aakar-studio__milestone-year">{entry.year}</span>
                <span className="aakar-studio__milestone-label">{entry.label}</span>
                <span className="aakar-studio__milestone-note">{entry.note}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  )
}

export default StudioIntro
