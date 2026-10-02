import { ArrowRight } from 'lucide-react'
import { useArtist } from '../../hooks/useArtist.js'
import { Button } from '../ui/Button.jsx'
import { HeroStage } from './HeroStage.jsx'
import { Parallax } from '../common/Parallax.jsx'
import { Loader } from '../ui/Loader.jsx'
import './Hero.css'

/**
 * AAKAR — Hero
 *
 * The exhibition entrance. Obsidian, editorial type, one exhibit on a measuring
 * grid, two actions. It deliberately refuses the ecommerce banner pattern: no
 * promotional badge, no carousel, no product grid — the first screen states what
 * the atelier is.
 *
 * All copy and figures come from the artist service; nothing here is hardcoded.
 */
export function Hero() {
  const { artist, isLoading } = useArtist()

  const tagline = artist?.tagline || 'Form. Craft. Digital.'
  const statement =
    artist?.statement ||
    'A digital atelier building production-ready 3D forms — sculpted by hand, exhibited in real time, delivered for production.'
  const location = [artist?.location, artist?.founded ? `Est. ${artist.founded}` : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <section className="aakar-hero" data-theme="dark" data-nav-theme="dark" aria-labelledby="hero-title">
      <div className="aakar-hero__inner aakar-container">
        <div className="aakar-hero__content">
          <p className="aakar-hero__meta aakar-label" data-reveal="fade">
            {location || 'Digital 3D Atelier'}
          </p>

          <h1 className="aakar-hero__title" id="hero-title">
            <span className="aakar-hero__mask" data-reveal="mask">
              <span>Aakar</span>
            </span>
          </h1>

          <p className="aakar-hero__tagline" data-reveal="up" data-reveal-delay="120">
            {tagline}
          </p>

          <p className="aakar-hero__statement" data-reveal="up" data-reveal-delay="200">
            {statement}
          </p>

          <div className="aakar-hero__actions" data-reveal="up" data-reveal-delay="280">
            <Button to="/collection" variant="primary" size="lg">
              Explore Collection
            </Button>
            <Button to="/studio" variant="secondary" size="lg">
              View Work
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>

          <dl className="aakar-hero__figures" data-reveal="up" data-reveal-delay="360">
            {isLoading ? (
              <Loader variant="inline" label="Loading studio figures" />
            ) : (
              (artist?.stats || []).map((stat) => (
                <div className="aakar-hero__figure" key={stat.id}>
                  <dt className="aakar-label">{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))
            )}
          </dl>

          {artist?.availability ? (
            <p className="aakar-hero__availability" data-reveal="fade" data-reveal-delay="420">
              <span className="aakar-hero__pulse" aria-hidden="true" />
              {artist.availability.label}
            </p>
          ) : null}
        </div>

        <div className="aakar-hero__stage">
          <Parallax speed={0.05} className="aakar-hero__stage-inner">
            <HeroStage palette={['#101319', '#05060a']} />
          </Parallax>
          <p className="aakar-hero__stage-caption aakar-label">
            <span aria-hidden="true">Exhibit 00</span>
            <span className="aakar-hero__stage-rule" aria-hidden="true" />
            <span>The Void Form — procedural study</span>
          </p>
        </div>
      </div>

      <div className="aakar-hero__scroll aakar-container" aria-hidden="true">
        <span className="aakar-hero__scroll-label aakar-label">Scroll</span>
        <span className="aakar-hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero
