import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/** AAKAR — Checkout (/checkout). No payment logic exists in this phase. */
export function Checkout() {
  return (
    <PlaceholderPage
      index="11"
      kicker="Checkout"
      title="Checkout"
      lead="A short, digital-only checkout: identity, order summary, licence selection, payment, confirmation. No shipping steps, no payment provider and no order processing are implemented in this phase."
      contents={[
        { id: 'identity', label: 'Account or guest identification' },
        { id: 'licence', label: 'Licence tier selection per asset' },
        { id: 'payment', label: 'Payment and order confirmation' },
        { id: 'delivery', label: 'Secure download delivery' },
      ]}
    />
  )
}

export default Checkout
