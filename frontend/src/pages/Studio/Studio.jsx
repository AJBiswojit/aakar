import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/** AAKAR — Studio (/studio) — the artist's portfolio. Foundation route. */
export function Studio() {
  return (
    <PlaceholderPage
      index="07"
      kicker="Selected Work"
      title="The portfolio"
      lead="Portfolio work is separate from the store: pieces that were commissioned, researched or released, documented with the process behind them. Portfolio records already load through the artist service."
      contents={[
        { id: 'work', label: 'Selected work, indexed and filtered' },
        { id: 'case', label: 'Case studies with process breakdowns' },
        { id: 'gallery', label: 'High-resolution plate galleries' },
        { id: 'credits', label: 'Credits, tools and delivery notes' },
      ]}
    />
  )
}

export default Studio
