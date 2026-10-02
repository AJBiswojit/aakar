import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/** AAKAR — Contact (/contact) — commission intake. Foundation route. */
export function Contact() {
  return (
    <PlaceholderPage
      index="09"
      kicker="Commissions"
      title="Brief the studio"
      lead="Custom 3D work — characters, creatures, props, environments or full asset sets. The commission flow (submitted → reviewing → quoted → in production → delivered) is planned; the studio's contact details are live below the foundation."
      contents={[
        { id: 'form', label: 'Project brief with reference upload' },
        { id: 'status', label: 'Request status tracking' },
        { id: 'quote', label: 'Scope, timeline and quote handover' },
        { id: 'messages', label: 'Threaded studio messages' },
      ]}
    />
  )
}

export default Contact
