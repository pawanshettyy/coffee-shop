export default function Navbar() {
  return (
    <nav className="w-full p-4 flex items-center justify-between bg-coffee text-cream">
      <h1 className="text-2xl font-bold">CoffeeCraft</h1>
      <ul className="flex gap-6 text-lg">
        <li><a href="/">Home</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Team</a></li>
      </ul>
    </nav>
  )
}
