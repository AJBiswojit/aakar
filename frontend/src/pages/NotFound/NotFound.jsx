import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/** AAKAR — 404 */
export function NotFound() {
  return (
    <PlaceholderPage
      index="404"
      kicker="Not Found"
      title="Nothing at this address"
      lead="The page you asked for is not part of the atelier. It may have been renamed, unpublished, or never existed at all."
      contents={[]}
    />
  )
}

export default NotFound
