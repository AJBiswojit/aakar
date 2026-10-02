import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/** AAKAR — About (/about) — the artist and the studio. Foundation route. */
export function About() {
  return (
    <PlaceholderPage
      index="08"
      kicker="The Artist"
      title="One artist, one studio"
      lead="AAKAR is a single-owner atelier. There is no team of vendors, no seller network and no marketplace behind it — the artist who sculpts the work is the artist who licenses it to you."
      contents={[
        { id: 'story', label: 'Artist statement and studio history' },
        { id: 'process', label: 'From zero to form: the production process' },
        { id: 'licensing', label: 'Licence terms and permitted usage' },
        { id: 'policies', label: 'Privacy, terms and refund policy' },
      ]}
    />
  )
}

export default About
