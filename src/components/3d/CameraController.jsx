import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/*
  Scroll-driven camera controller that smoothly interpolates between
  predefined camera positions/targets based on the current scene and scroll progress.
*/

const LERP_FACTOR = 0.03

const CAMERA_STATES = {
  landing: {
    position: new THREE.Vector3(0, 2.5, 8),
    target: new THREE.Vector3(0, 1.5, 0),
  },
  forestStart: {
    position: new THREE.Vector3(0, 3, 10),
    target: new THREE.Vector3(0, 1, -5),
  },
  forestMid: {
    position: new THREE.Vector3(2, 2.5, 2),
    target: new THREE.Vector3(0, 1, -8),
  },
  forestEnd: {
    position: new THREE.Vector3(0, 3, -5),
    target: new THREE.Vector3(0, 1.2, -15),
  },
  decision: {
    position: new THREE.Vector3(0, 2.5, -12),
    target: new THREE.Vector3(0, 1.5, -20),
  },
  stadium: {
    position: new THREE.Vector3(0, 8, 18),
    target: new THREE.Vector3(0, 0, 0),
  },
  stadiumClose: {
    position: new THREE.Vector3(5, 3, 8),
    target: new THREE.Vector3(0, 0.5, 0),
  },
}

export default function CameraController({ scene = 'landing', scrollProgress = 0 }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 2.5, 8))
  const targetLook = useRef(new THREE.Vector3(0, 1.5, 0))

  useFrame(() => {
    let camState

    if (scene === 'landing') {
      camState = CAMERA_STATES.landing
    } else if (scene === 'forest') {
      // Interpolate between forest camera positions based on scroll
      if (scrollProgress < 0.33) {
        const t = scrollProgress / 0.33
        camState = {
          position: new THREE.Vector3().lerpVectors(CAMERA_STATES.forestStart.position, CAMERA_STATES.forestMid.position, t),
          target: new THREE.Vector3().lerpVectors(CAMERA_STATES.forestStart.target, CAMERA_STATES.forestMid.target, t),
        }
      } else if (scrollProgress < 0.66) {
        const t = (scrollProgress - 0.33) / 0.33
        camState = {
          position: new THREE.Vector3().lerpVectors(CAMERA_STATES.forestMid.position, CAMERA_STATES.forestEnd.position, t),
          target: new THREE.Vector3().lerpVectors(CAMERA_STATES.forestMid.target, CAMERA_STATES.forestEnd.target, t),
        }
      } else {
        const t = (scrollProgress - 0.66) / 0.34
        camState = {
          position: new THREE.Vector3().lerpVectors(CAMERA_STATES.forestEnd.position, CAMERA_STATES.decision.position, t),
          target: new THREE.Vector3().lerpVectors(CAMERA_STATES.forestEnd.target, CAMERA_STATES.decision.target, t),
        }
      }
    } else if (scene === 'decision') {
      camState = CAMERA_STATES.decision
    } else if (scene === 'stadium') {
      const t = Math.min(1, scrollProgress * 2)
      camState = {
        position: new THREE.Vector3().lerpVectors(CAMERA_STATES.stadium.position, CAMERA_STATES.stadiumClose.position, t),
        target: new THREE.Vector3().lerpVectors(CAMERA_STATES.stadium.target, CAMERA_STATES.stadiumClose.target, t),
      }
    } else {
      camState = CAMERA_STATES.landing
    }

    // Smooth lerp to target
    targetPos.current.lerp(camState.position, LERP_FACTOR)
    targetLook.current.lerp(camState.target, LERP_FACTOR)

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLook.current)
  })

  return null
}
