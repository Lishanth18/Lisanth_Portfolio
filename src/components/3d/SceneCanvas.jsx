import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { useResponsive } from '../../hooks/useResponsive'

export default function SceneCanvas({ children }) {
  const { quality } = useResponsive()

  const dpr = useMemo(() => {
    switch (quality) {
      case 'low': return [0.8, 1.2]
      case 'medium': return [1, 1.5]
      case 'high': return [1, 2]
      default: return [1, 2]
    }
  }, [quality])

  return (
    <div className="canvas-container">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 2, 8], fov: 50, near: 0.1, far: 200 }}
        gl={{
          antialias: quality !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows={quality === 'high'}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <fog attach="fog" args={['#0a1a0f', 20, 80]} />

        {/* Global Lighting */}
        <ambientLight intensity={0.4} color="#8fd49e" />
        <directionalLight
          position={[10, 20, 5]}
          intensity={1.2}
          color="#f5f0e8"
          castShadow={quality === 'high'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <hemisphereLight args={['#5ab56e', '#0a1a0f', 0.5]} />

        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
