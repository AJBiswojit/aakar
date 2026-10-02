import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import { PRIMARY_NAV } from '../../routes/navigation.js'

/**
 * AAKAR — NavLinks
 *
 * Primary navigation list, shared by the desktop bar and the mobile drawer.
 * Active state is a cobalt rule drawn under the label, never a pill or a box.
 */
export function NavLinks({ items = PRIMARY_NAV, variant = 'bar', onNavigate, className }) {
  return (
    <ul className={cn('aakar-navlinks', `aakar-navlinks--${variant}`, className)}>
      {items.map((item) => (
        <li className="aakar-navlinks__item" key={item.id}>
          <NavLink
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn('aakar-navlinks__link', isActive && 'is-active')
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks
