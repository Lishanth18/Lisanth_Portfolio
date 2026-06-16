import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
  Ambient particle systems for different scenes:
  - Fireflies for forest
  - Golden dust for landing
  - Confetti for celebration
*/

export default function Particles({ type = 'fireflies', count = 50, spread = 20, color = '#5ab56e' }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particleData = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * spread,
        y: Math.random() * (spread / 2) + 0.5,
        z: (Math.random() - 0.5) * spread,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        amplitude: 0.3 + Math.random() * 0.7,
      })
    }
    return data
  }, [count, spread])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const p = particleData[i]
      let x = p.x, y = p.y, z = p.z

      if (type === 'fireflies') {
        x += Math.sin(time * p.speed + p.offset) * p.amplitude
        y += Math.sin(time * p.speed * 0.7 + p.offset) * 0.3
        z += Math.cos(time * p.speed * 0.5 + p.offset) * p.amplitude
        const glow = 0.5 + Math.sin(time * 2 + p.offset) * 0.5
        dummy.scale.setScalar(0.03 + glow * 0.04)
      } else if (type === 'golden') {
        y += Math.sin(time * p.speed + p.offset) * 0.5
        x += Math.sin(time * 0.3 + p.offset) * 0.2
        dummy.scale.setScalar(0.02 + Math.sin(time + p.offset) * 0.01)
      } else if (type === 'confetti') {
        y = p.y - ((time * p.speed * 2 + p.offset) % (spread / 2))
        if (y < 0) y += spread / 2
        x += Math.sin(time + p.offset) * 0.5
        dummy.scale.setScalar(0.05)
      }

      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  const particleColor = useMemo(() => {
    if (type === 'fireflies') return '#aeff6e'
    if (type === 'golden') return '#d4a853'
    if (type === 'confetti') return color
    return color
  }, [type, color])

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={particleColor}
        transparent
        opacity={type === 'fireflies' ? 0.8 : 0.6}
      />
    </instancedMesh>
  )
}
