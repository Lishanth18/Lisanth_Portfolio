import { useRef, useEffect, useMemo, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AVATAR_STATES } from '../../context/JourneyContext'

/*
  Avatar component that loads the user's GLB models and plays the appropriate animations.
  
  Models used:
  - "Stop Walking.glb"     → stops walking and turns back at decision point
  - "Look Over Shoulder.glb" → turns and asks users which path to choose
  - "Kneeling Pointing.glb"  → starting position in athletics / pointing to users
*/

const MODEL_PATHS = {
  stopWalking: '/models/Stop Walking.glb',
  lookOverShoulder: '/models/Look Over Shoulder.glb',
  kneelingPointing: '/models/Kneeling Pointing.glb',
}

// Preload all models (non-blocking, just starts fetch)
try {
  Object.values(MODEL_PATHS).forEach((path) => {
    useGLTF.preload(path)
  })
} catch (e) {
  console.warn('Avatar preload failed:', e)
}

function AvatarModel({ modelPath, visible, position, rotation, scale, timeScale = 1 }) {
  const group = useRef()
  
  let gltfData
  try {
    gltfData = useGLTF(modelPath)
  } catch (e) {
    // Model is still loading (Suspense will handle) or failed
    throw e
  }

  const { scene, animations } = gltfData
  const { actions, mixer } = useAnimations(animations, group)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material = child.material.clone()
        }
      }
    })
    return clone
  }, [scene])

  useEffect(() => {
    if (!visible || !actions) return

    // Stop all first
    Object.values(actions).forEach((action) => {
      try { action?.stop() } catch (e) { /* ignore */ }
    })

    if (!visible) return

    // Play the first available animation
    const actionNames = Object.keys(actions)
    if (actionNames.length > 0) {
      const action = actions[actionNames[0]]
      if (action) {
        action.reset()
        action.setEffectiveTimeScale(timeScale)
        action.setEffectiveWeight(1)
        action.fadeIn(0.5)
        action.play()
      }
    }

    return () => {
      Object.values(actions).forEach((action) => {
        try { action?.fadeOut(0.3) } catch (e) { /* ignore */ }
      })
    }
  }, [visible, actions, timeScale])

  useFrame((_, delta) => {
    if (mixer && visible) {
      mixer.update(delta)
    }
  })

  if (!visible) return null

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  )
}

export default function Avatar({ state = AVATAR_STATES.IDLE, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const scaleArr = typeof scale === 'number' ? [scale, scale, scale] : scale

  // Map avatar states to which single model to show
  // Only render ONE model at a time to avoid loading all 3 simultaneously
  let activeModel = 'lookOverShoulder'
  if (state === AVATAR_STATES.STOP_WALKING || state === AVATAR_STATES.WALKING) {
    activeModel = 'stopWalking'
  } else if (state === AVATAR_STATES.KNEELING_POINTING || state === AVATAR_STATES.CELEBRATING) {
    activeModel = 'kneelingPointing'
  }

  return (
    <group ref={groupRef}>
      {activeModel === 'stopWalking' && (
        <AvatarModel
          modelPath={MODEL_PATHS.stopWalking}
          visible={true}
          position={position}
          rotation={rotation}
          scale={scaleArr}
          timeScale={state === AVATAR_STATES.WALKING ? 1 : 0.8}
        />
      )}
      {activeModel === 'lookOverShoulder' && (
        <AvatarModel
          modelPath={MODEL_PATHS.lookOverShoulder}
          visible={true}
          position={position}
          rotation={rotation}
          scale={scaleArr}
        />
      )}
      {activeModel === 'kneelingPointing' && (
        <AvatarModel
          modelPath={MODEL_PATHS.kneelingPointing}
          visible={true}
          position={position}
          rotation={rotation}
          scale={scaleArr}
        />
      )}
    </group>
  )
}
