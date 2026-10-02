import { Hero } from '../../components/hero/Hero.jsx'
import { FeaturedWork } from '../../components/collection/FeaturedWork.jsx'
import { CategoryIndex } from '../../components/collection/CategoryIndex.jsx'
import { ProductShowcase } from '../../components/products/ProductShowcase.jsx'
import { StudioIntro } from '../../components/studio/StudioIntro.jsx'
import { CustomProjectCta } from '../../components/studio/CustomProjectCta.jsx'
import { useReveal } from '../../hooks/useReveal.js'
import './Home.css'

/**
 * AAKAR — Home
 *
 * The brand experience, in alternating visual zones:
 *
 *   BLACK  Hero              — immersion
 *   WHITE  Featured work     — information
 *   SOFT   Catalogue index   — information
 *   WHITE  The store         — store
 *   BLACK  The studio        — portfolio storytelling
 *   BLACK  Commissions       — CTA
 *
 * Each section owns its data (through hooks) and its surface (`data-theme`),
 * so this file stays a composition and nothing else.
 */
export function Home() {
  useReveal([])

  return (
    <>
      <Hero />
      <FeaturedWork />
      <CategoryIndex />
      <ProductShowcase />
      <StudioIntro />
      <CustomProjectCta />
    </>
  )
}

export default Home
