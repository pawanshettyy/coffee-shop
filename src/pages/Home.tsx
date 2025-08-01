import PageWrapper from '../components/PageWrapper'
import HoverImage from '../components/HoverImage'
import ImageGrid from '../components/ImageGrid'
import Marquee from '../components/Marquee'
import ScrollText from '../components/ScrollText'
import Mystery3D from '../components/Mystery3D'

export default function Home() {
  return (
    <PageWrapper>
      {/* Scroll-based Text Animation (Element 9) */}
      <ScrollText />

      {/* Infinite Marquee (Element 6) */}
      <section className="mb-10">
        <Marquee />
      </section>

      {/* Hover Image (Element 2) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Signature Blend</h2>
        <HoverImage
          src="/images/coffee-cup.jpg"
          hoverSrc="/images/coffee-pour.jpg"
          alt="Coffee"
          className="w-96"
        />
      </section>

      {/* Image Grid + Cursor Effects (Element 3) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Gallery</h2>
        <ImageGrid />
      </section>

      

      {/* 3D Mystery Element (Element 10) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Mystery Element</h2>
        <Mystery3D />
      </section>
    </PageWrapper>
  )
}
