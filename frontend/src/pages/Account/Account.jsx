import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/** AAKAR — Account (/account). No authentication exists in this phase. */
export function Account() {
  return (
    <PlaceholderPage
      index="12"
      kicker="Your Account"
      title="The account"
      lead="Customer accounts, orders, downloads and saved assets. Authentication is not part of this phase — the cart and wishlist already persist locally so the state architecture is proven before it is moved behind an API."
      contents={[
        { id: 'profile', label: 'Profile and settings' },
        { id: 'orders', label: 'Order history and payment status' },
        { id: 'downloads', label: 'Secure downloads with temporary links' },
        { id: 'wishlist', label: 'Saved assets and wishlist' },
      ]}
    />
  )
}

export default Account
