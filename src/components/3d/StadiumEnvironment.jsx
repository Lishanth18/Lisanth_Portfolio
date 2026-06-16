import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
  Athletics stadium environment with track, lane markings, crowd, podium, and starting blocks.
*/

function Track() {
  // Create an oval track using a shape
  const trackShape = useMemo(() => {
    const shape = new THREE.Shape()
    // Outer oval
    const outerW = 12, outerH = 6
    shape.ellipse(0, 0, outerW, outerH, 0, Math.PI * 2, false, 0)

    // Inner oval (hole)
    const hole = new THREE.Path()
    hole.ellipse(0, 0, outerW - 2, outerH - 2, 0, Math.PI * 2, false, 0)
    shape.holes.push(hole)

    return shape
  }, [])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <mesh receiveShadow>
        <shapeGeometry args={[trackShape, 64]} />
        <meshStandardMaterial color="#c23434" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Lane lines */}
      {[1, 2, 3, 4, 5, 6].map((lane) => {
        const points = []
        const r1 = 4 + lane * 0.3
        const r2 = 10 + lane * 0.3
        for (let i = 0; i <= 64; i++) {
          const angle = (i / 64) * Math.PI * 2
          points.push(new THREE.Vector3(Math.cos(angle) * r2, Math.sin(angle) * r1, 0.01))
        }
        return (
          <line key={lane}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="white" opacity={0.4} transparent />
          </line>
        )
      })}
    </group>
  )
}

function InnerField() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <ellipseGeometry args={[10, 4, 64]} />
      <meshStandardMaterial color="#2d6b3f" roughness={0.9} />
    </mesh>
  )
}

function Crowd({ count = 200 }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const { matrices, colors } = useMemo(() => {
    const mat = []
    const col = []
    const crowdColors = ['#e05050', '#5ab56e', '#67b8d4', '#d4a853', '#f5f0e8', '#c23434', '#3d8b52']
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 14 + Math.random() * 4
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * (radius * 0.5)
      const y = 0.3 + Math.random() * 0.2

      dummy.position.set(x, y, z)
      dummy.scale.set(0.15, 0.3 + Math.random() * 0.2, 0.15)
      dummy.updateMatrix()
      mat.push(dummy.matrix.clone())
      col.push(new THREE.Color(crowdColors[Math.floor(Math.random() * crowdColors.length)]))
    }
    return { matrices: mat, colors: col }
  }, [count, dummy])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.elapsedTime
    
    for (let i = 0; i < count; i++) {
      const m = matrices[i]
      dummy.position.setFromMatrixPosition(m)
      dummy.scale.setFromMatrixScale(m)
      // Subtle wave animation
      dummy.position.y += Math.sin(time * 2 + i * 0.5) * 0.05
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e05050" roughness={0.7} />
    </instancedMesh>
  )
}

function Podium() {
  return (
    <group position={[0, 0, -8]}>
      {/* 1st place */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#d4a853" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* 2nd place */}
      <mesh position={[-2, 0.35, 0]} castShadow>
        <boxGeometry args={[1.5, 0.7, 1.5]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* 3rd place */}
      <mesh position={[2, 0.25, 0]} castShadow>
        <boxGeometry args={[1.5, 0.5, 1.5]} />
        <meshStandardMaterial color="#cd7f32" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  )
}

function StartingBlocks({ position = [8, 0, 0] }) {
  return (
    <group position={position}>
      {[0, 1, 2, 3, 4, 5].map((lane) => (
        <group key={lane} position={[0, 0, -2 + lane * 0.8]}>
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.3, 0.1, 0.4]} />
            <meshStandardMaterial color="#333" roughness={0.7} metalness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FinishLine({ position = [-8, 0, 0] }) {
  return (
    <group position={position}>
      {/* Finish line banner */}
      <mesh position={[0, 2, 0]}>
        <planeGeometry args={[0.2, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 2, 3]}>
        <planeGeometry args={[0.2, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Banner */}
      <mesh position={[0, 3.8, 1.5]}>
        <planeGeometry args={[0.1, 3.2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

export default function StadiumEnvironment({ showPodium = false }) {
  return (
    <group>
      {/* Stadium ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#1a2a1a" roughness={1} />
      </mesh>

      <Track />
      <InnerField />
      <Crowd count={150} />
      <StartingBlocks />
      <FinishLine />
      {showPodium && <Podium />}

      {/* Stadium lights */}
      <pointLight position={[15, 12, 15]} intensity={50} color="#f5e8c0" distance={40} />
      <pointLight position={[-15, 12, -15]} intensity={50} color="#f5e8c0" distance={40} />
      <pointLight position={[15, 12, -15]} intensity={30} color="#f5e8c0" distance={40} />
      <pointLight position={[-15, 12, 15]} intensity={30} color="#f5e8c0" distance={40} />
    </group>
  )
}
