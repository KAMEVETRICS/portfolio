'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import OrbitControls from './OrbitControls'
import ParticleSphere from './ParticleSphere'

export default function ParticleSphereScene() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-gray-900 to-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} />
          <ParticleSphere imageUrl="/dp.png" />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

