import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* 
  Procedural forest environment with instanced trees, road, ground, fog, and ambient nature elements.
  All geometry is generated in code — no external models needed.
*/

function ProceduralTree({ position, scale = 1, variant = 0 }) {
  const trunkHeight = (1.5 + variant * 0.5) * scale
  const crownRadius = (0.8 + variant * 0.3) * scale

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, trunkHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.08 * scale, 0.12 * scale, trunkHeight, 6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      {/* Crown layers */}
      <mesh position={[0, trunkHeight + crownRadius * 0.3, 0]} castShadow>
        <coneGeometry args={[crownRadius, crownRadius * 2, 7]} />
        <meshStandardMaterial color={variant > 0.5 ? '#2d6b3f' : '#1d5a2e'} roughness={0.85} />
      </mesh>
      <mesh position={[0, trunkHeight + crownRadius * 1.1, 0]} castShadow>
        <coneGeometry args={[crownRadius * 0.7, crownRadius * 1.5, 7]} />
        <meshStandardMaterial color={variant > 0.3 ? '#3d8b52' : '#2d7042'} roughness={0.85} />
      </mesh>
    </group>
  )
}

function InstancedTrees({ count = 80, spread = 50, roadWidth = 3 }) {
  const meshRef = useRef()
  
  const { positions, scales, variants } = useMemo(() => {
    const pos = []
    const scl = []
    const vars = []
    const seededRandom = (seed) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + 100)
      const r3 = seededRandom(i + 200)

      // Position trees on both sides of the road
      const side = r1 > 0.5 ? 1 : -1
      const x = side * (roadWidth + 1 + r2 * (spread / 2 - roadWidth))
      const z = -spread / 2 + r3 * spread
      const y = 0

      pos.push([x, y, z])
      scl.push(0.6 + r2 * 0.8)
      vars.push(r1)
    }
    return { positions: pos, scales: scl, variants: vars }
  }, [count, spread, roadWidth])

  return (
    <group>
      {positions.map((pos, i) => (
        <ProceduralTree
          key={i}
          position={pos}
          scale={scales[i]}
          variant={variants[i]}
        />
      ))}
    </group>
  )
}

function Road({ length = 50, width = 2.5 }) {
  return (
    <group>
      {/* Main road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          color="#3d3428"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      {/* Road edges */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-width / 2 - 0.15, 0.015, 0]} receiveShadow>
        <planeGeometry args={[0.3, length]} />
        <meshStandardMaterial color="#5a4a38" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 + 0.15, 0.015, 0]} receiveShadow>
        <planeGeometry args={[0.3, length]} />
        <meshStandardMaterial color="#5a4a38" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Ground({ size = 100 }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color="#1a3320"
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

function Bushes({ count = 30, spread = 50, roadWidth = 3 }) {
  const bushes = useMemo(() => {
    const result = []
    for (let i = 0; i < count; i++) {
      const seed = i * 73.137
      const r1 = Math.abs(Math.sin(seed)) 
      const r2 = Math.abs(Math.cos(seed))
      const side = r1 > 0.5 ? 1 : -1
      const x = side * (roadWidth + 0.5 + r2 * 4)
      const z = -spread / 2 + r1 * spread
      result.push({
        position: [x, 0.2, z],
        scale: 0.2 + r2 * 0.4,
      })
    }
    return result
  }, [count, spread, roadWidth])

  return (
    <group>
      {bushes.map((bush, i) => (
        <mesh key={i} position={bush.position} castShadow>
          <sphereGeometry args={[bush.scale, 6, 5]} />
          <meshStandardMaterial color="#2d5a35" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function SunRays() {
  const raysRef = useRef()

  useFrame(({ clock }) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.1
      raysRef.current.material.opacity = 0.08 + Math.sin(clock.elapsedTime * 0.3) * 0.03
    }
  })

  return (
    <mesh ref={raysRef} position={[5, 15, -10]} rotation={[0, 0, -0.5]}>
      <planeGeometry args={[8, 30]} />
      <meshBasicMaterial
        color="#f5e8c0"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function ForkInRoad({ position = [0, 0, -20] }) {
  return (
    <group position={position}>
      {/* Left path */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 6]} position={[-3, 0.01, -5]} receiveShadow>
        <planeGeometry args={[2, 12]} />
        <meshStandardMaterial color="#3d3428" roughness={0.95} />
      </mesh>
      {/* Right path */}
      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 6]} position={[3, 0.01, -5]} receiveShadow>
        <planeGeometry args={[2, 12]} />
        <meshStandardMaterial color="#3d3428" roughness={0.95} />
      </mesh>
      {/* Divider / grass patch */}
      <mesh position={[0, 0.05, -4]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial color="#2d6b3f" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function ForestEnvironment({ showFork = false }) {
  const groupRef = useRef()

  return (
    <group ref={groupRef}>
      <Ground />
      <Road length={60} />
      <InstancedTrees count={70} spread={60} />
      <Bushes count={25} spread={60} />
      <SunRays />
      {showFork && <ForkInRoad />}
    </group>
  )
}
