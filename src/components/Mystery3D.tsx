import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function CoffeeModel() {
  const gltf = useGLTF('/models/coffee-cup.glb')
  return <primitive object={gltf.scene} scale={4.5} position={[0, -1, 0]} />
}

export default function Mystery3D() {
  return (
    <div className="h-[500px] bg-cream border border-accent rounded-xl shadow-lg overflow-hidden">
      <Canvas camera={{ position: [0, 1, 3.5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <CoffeeModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}
