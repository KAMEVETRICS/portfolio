'use client'

import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OrbitControlsProps {
  enableZoom?: boolean
  enablePan?: boolean
  minDistance?: number
  maxDistance?: number
  autoRotate?: boolean
  autoRotateSpeed?: number
}

export default function OrbitControls({
  enableZoom = true,
  enablePan = false,
  minDistance = 3,
  maxDistance = 8,
  autoRotate = false,
  autoRotateSpeed = 0.5,
}: OrbitControlsProps) {
  const { camera, gl } = useThree()
  const isDraggingRef = useRef(false)

  useEffect(() => {
    // Simple mouse controls
    let previousMousePosition = { x: 0, y: 0 }

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return

      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      const spherical = new THREE.Spherical()
      spherical.setFromVector3(camera.position)
      spherical.theta -= deltaX * 0.01
      spherical.phi += deltaY * 0.01
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi))

      camera.position.setFromSpherical(spherical)
      camera.lookAt(0, 0, 0)

      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDraggingRef.current = false
    }

    const onWheel = (e: WheelEvent) => {
      if (!enableZoom) return
      e.preventDefault()

      const distance = camera.position.length()
      const newDistance = distance + e.deltaY * 0.01
      const clampedDistance = Math.max(minDistance, Math.min(maxDistance, newDistance))

      camera.position.normalize().multiplyScalar(clampedDistance)
    }

    gl.domElement.addEventListener('mousedown', onMouseDown)
    gl.domElement.addEventListener('mousemove', onMouseMove)
    gl.domElement.addEventListener('mouseup', onMouseUp)
    gl.domElement.addEventListener('wheel', onWheel)

    return () => {
      gl.domElement.removeEventListener('mousedown', onMouseDown)
      gl.domElement.removeEventListener('mousemove', onMouseMove)
      gl.domElement.removeEventListener('mouseup', onMouseUp)
      gl.domElement.removeEventListener('wheel', onWheel)
    }
  }, [camera, gl, enableZoom, minDistance, maxDistance])

  useFrame(() => {
    if (autoRotate && !isDraggingRef.current) {
      const spherical = new THREE.Spherical()
      spherical.setFromVector3(camera.position)
      spherical.theta += autoRotateSpeed * 0.01
      camera.position.setFromSpherical(spherical)
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}
