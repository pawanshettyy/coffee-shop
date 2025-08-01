import HoverImage from '../components/HoverImage'
import ImageGrid from '../components/ImageGrid'

export default function Home() {
  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Signature Blend</h2>
        <HoverImage
          src="/images/coffee-cup.jpg"
          hoverSrc="/images/coffee-pour.jpg"
          alt="Coffee"
          className="w-96"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Gallery</h2>
        <ImageGrid />
      </section>
    </div>
  )
}
