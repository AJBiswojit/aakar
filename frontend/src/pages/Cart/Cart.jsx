import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '../../hooks/useCart.js'
import { useReveal } from '../../hooks/useReveal.js'
import { Kicker } from '../../components/ui/Kicker.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Notice } from '../../components/ui/Notice.jsx'
import { formatPrice } from '../../utils/format.js'
import './Cart.css'

/**
 * AAKAR — Cart (/cart)
 *
 * The cart foundation, visible: lines, removal and a derived subtotal. No tax,
 * no licence selection, no payment — those belong to the commerce phase and to
 * the backend. Digital licences are single-unit, so there are no quantities.
 */
export function Cart() {
  const { items, itemCount, subtotal, currency, removeItem, clear } = useCart()

  useReveal([itemCount])

  return (
    <section className="aakar-cart aakar-container" data-theme="light" data-nav-theme="light">
      <Kicker index="10" data-reveal="fade">
        Your Cart
      </Kicker>

      <h1 className="aakar-cart__title" data-reveal="up">
        Cart
      </h1>

      {itemCount === 0 ? (
        <Notice
          kicker="Empty"
          title="No licences in the cart yet."
          action={
            <Button to="/collection" variant="primary">
              Enter the store
            </Button>
          }
        >
          Assets you add are held here. Checkout and secure downloads arrive with the
          commerce phase.
        </Notice>
      ) : (
        <div className="aakar-cart__body" data-reveal="up">
          <ul className="aakar-cart__lines">
            {items.map((item) => (
              <li className="aakar-cart__line" key={item.slug}>
                <div className="aakar-cart__line-main">
                  <Link className="aakar-cart__line-name aakar-underline" to={`/product/${item.slug}`}>
                    {item.name}
                  </Link>
                  <p className="aakar-cart__line-meta aakar-label">
                    {[item.category, item.license ? `${item.license} licence` : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>

                <p className="aakar-cart__line-price">{formatPrice(item.pricing)}</p>

                <button
                  type="button"
                  className="aakar-cart__remove"
                  onClick={() => removeItem(item.slug)}
                  aria-label={`Remove ${item.name} from the cart`}
                >
                  <X size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="aakar-cart__summary">
            <p className="aakar-label aakar-cart__summary-label">Order summary</p>
            <p className="aakar-cart__subtotal">
              {formatPrice({ amount: subtotal, currency })}
            </p>
            <p className="aakar-cart__summary-note">
              {itemCount} {itemCount === 1 ? 'licence' : 'licences'} · taxes and licence terms
              are confirmed at checkout.
            </p>

            <Button to="/checkout" variant="primary" full>
              Proceed to checkout
            </Button>
            <Button variant="line" onClick={clear}>
              Clear cart
            </Button>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
