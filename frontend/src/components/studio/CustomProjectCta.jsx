import { useArtist } from '../../hooks/useArtist.js'
import { Kicker } from '../ui/Kicker.jsx'
import { Button } from '../ui/Button.jsx'
import './CustomProjectCta.css'

/**
 * AAKAR — CustomProjectCta
 *
 * BLACK / CTA. The commercial invitation: commission the studio. Type-led
 * rather than image-led, with the cobalt rule drawn full width beneath it — the
 * interaction colour carrying the page from storytelling into asking.
 */
export function CustomProjectCta() {
  const { artist } = useArtist()

  const steps = [
    'Tell the studio what the asset is for',
    'Share references, style and technical constraints',
    'Receive a scope, timeline and quote',
  ]

  return (
    <section className="aakar-section aakar-cta" data-theme="dark" data-nav-theme="dark" aria-labelledby="cta-title">
      <div className="aakar-container aakar-cta__inner">
        <Kicker index="05" className="aakar-cta__kicker" data-reveal="fade">
          Commissions
        </Kicker>

        <h2 className="aakar-cta__title" id="cta-title" data-reveal="up">
          Start a project
        </h2>

        <p className="aakar-cta__lead" data-reveal="up" data-reveal-delay="120">
          Need a character, a creature, an environment or a full asset set built to your
          pipeline? The studio takes a small number of commissions each quarter.
        </p>

        <ol className="aakar-cta__steps">
          {steps.map((step, position) => (
            <li className="aakar-cta__step" key={step} data-reveal="up" data-reveal-delay={180 + position * 80}>
              <span className="aakar-cta__step-index aakar-label">
                {String(position + 1).padStart(2, '0')}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="aakar-cta__actions" data-reveal="up" data-reveal-delay="420">
          <Button to="/contact" variant="primary" size="lg">
            Brief the studio
          </Button>

          {artist?.email ? (
            <a className="aakar-cta__email aakar-label" href={`mailto:${artist.email}`}>
              {artist.email}
            </a>
          ) : null}
        </div>

        <span className="aakar-cta__rule" data-reveal="line" aria-hidden="true" />
      </div>
    </section>
  )
}

export default CustomProjectCta
