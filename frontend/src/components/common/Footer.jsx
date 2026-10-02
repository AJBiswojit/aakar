import { Link } from 'react-router-dom'
import { useArtist } from '../../hooks/useArtist.js'
import { activeSource } from '../../services/index.js'
import { env } from '../../utils/env.js'
import {
  POLICY_LINKS,
  PRIMARY_NAV,
  STORE_LINKS,
  STUDIO_LINKS,
} from '../../routes/navigation.js'
import './Footer.css'

/**
 * AAKAR — Footer
 *
 * The atelier's closing plate: obsidian, hairline columns, contact and legal.
 * Brand, contact, socials and location all come from the artist service — a
 * single-owner studio, so there is one set of details, not a vendor directory.
 */
export function Footer() {
  const { artist } = useArtist()

  const columns = [
    { id: 'explore', title: 'Explore', links: PRIMARY_NAV },
    { id: 'store', title: 'Store', links: STORE_LINKS },
    { id: 'studio', title: 'Studio', links: STUDIO_LINKS },
    { id: 'legal', title: 'Policies', links: POLICY_LINKS },
  ]

  return (
    <footer className="aakar-footer" data-theme="dark" data-nav-theme="dark">
      <div className="aakar-container">
        <div className="aakar-footer__inner">
          <div className="aakar-footer__brand">
            <Link className="aakar-footer__wordmark" to="/">
              Aakar
            </Link>
            <p className="aakar-footer__tagline">
              {artist?.tagline || 'Form. Craft. Digital.'}
            </p>
            <p className="aakar-footer__statement">
              A digital atelier where 3D art is exhibited, examined, experienced and
              purchased — by one artist, from one studio.
            </p>

            {artist?.availability ? (
              <p className="aakar-footer__availability">
                <span className="aakar-footer__pulse" aria-hidden="true" />
                {artist.availability.label}
              </p>
            ) : null}
          </div>

          <nav className="aakar-footer__columns" aria-label="Footer">
            {columns.map((column) => (
              <div className="aakar-footer__column" key={column.id}>
                <h2 className="aakar-footer__column-title aakar-label">{column.title}</h2>
                <ul className="aakar-footer__links">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <Link className="aakar-footer__link" to={link.path}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="aakar-footer__column">
              <h2 className="aakar-footer__column-title aakar-label">Contact</h2>
              <ul className="aakar-footer__links">
                {artist?.email ? (
                  <li>
                    <a className="aakar-footer__link" href={`mailto:${artist.email}`}>
                      {artist.email}
                    </a>
                  </li>
                ) : null}
                {artist?.location ? (
                  <li className="aakar-footer__static">{artist.location}</li>
                ) : null}
                {(artist?.socials || [])
                  .filter((social) => social.url)
                  .map((social) => (
                    <li key={social.id}>
                      <a className="aakar-footer__link" href={social.url}>
                        {social.label} — {social.handle}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="aakar-footer__base">
          <p className="aakar-footer__legal aakar-label">
            © {new Date().getFullYear()} AAKAR · Digital 3D Atelier
          </p>

          <p className="aakar-footer__meta aakar-label">
            Single-owner studio — no vendors, no marketplace
          </p>

          {env.isDev ? (
            <p className="aakar-footer__meta aakar-label">Data source: {activeSource}</p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export default Footer
