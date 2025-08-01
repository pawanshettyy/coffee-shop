import HoverImage from '../components/HoverImage'

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Signature Blend</h2>
      <HoverImage
        src="/images/coffee-cup.jpg"
        hoverSrc="/images/coffee-pour.jpg"
        alt="Coffee"
        className="w-96"
      />
    </div>
  )
}
