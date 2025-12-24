'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSphereProps {
  imageUrl?: string
}

function createFallbackTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  gradient.addColorStop(0, '#4a90e2')
  gradient.addColorStop(0.5, '#7b68ee')
  gradient.addColorStop(1, '#2d1b4e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)
  return new THREE.CanvasTexture(canvas)
}

export default function ParticleSphere({ imageUrl = '/dp.png' }: ParticleSphereProps) {
  const meshRef = useRef<THREE.Points>(null)
  const particleCount = 10000
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 512, height: 512 })

  // Load image and extract pixel data
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            throw new Error('Could not get 2d context')
          }
          ctx.drawImage(img, 0, 0)
          
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
          setImageData(data)
          setImageDimensions({ width: img.width, height: img.height })
        } catch (error) {
          console.error('Error processing image:', error)
          // Create fallback
          const canvas = document.createElement('canvas')
          canvas.width = 512
          canvas.height = 512
          const ctx = canvas.getContext('2d')!
          const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
          gradient.addColorStop(0, '#4a90e2')
          gradient.addColorStop(1, '#2d1b4e')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, 512, 512)
          const data = ctx.getImageData(0, 0, 512, 512)
          setImageData(data)
        }
      }
      
      img.onerror = () => {
        // Fallback if image fails to load
        try {
          const canvas = document.createElement('canvas')
          canvas.width = 512
          canvas.height = 512
          const ctx = canvas.getContext('2d')!
          const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
          gradient.addColorStop(0, '#4a90e2')
          gradient.addColorStop(1, '#2d1b4e')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, 512, 512)
          const data = ctx.getImageData(0, 0, 512, 512)
          setImageData(data)
        } catch (error) {
          console.error('Error creating fallback:', error)
        }
      }
      
      img.src = imageUrl
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }, [imageUrl])

  // Create particles based on image shape
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    if (!imageData) {
      // Return default sphere positions if image not loaded yet
      for (let i = 0; i < particleCount; i++) {
        const radius = 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)
        
        colors[i * 3] = 0.3
        colors[i * 3 + 1] = 0.3
        colors[i * 3 + 2] = 0.3
      }
      return { positions, colors }
    }

    const { width, height } = imageDimensions
    const data = imageData.data
    const validPixels: Array<{ x: number; y: number; r: number; g: number; b: number }> = []

    // Collect all non-transparent pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]
        const a = data[index + 3]
        
        // Only include pixels with sufficient opacity (threshold to avoid transparent areas)
        if (a > 10) {
          validPixels.push({ x, y, r, g, b })
        }
      }
    }

    // If no valid pixels, create a fallback
    if (validPixels.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        const radius = 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)
        
        colors[i * 3] = 0.3
        colors[i * 3 + 1] = 0.3
        colors[i * 3 + 2] = 0.3
      }
      return { positions, colors }
    }

    // Map image pixels to 3D positions using planar projection
    const aspectRatio = width / height
    const scale = 3.0 // Size of the particle shape
    const depthScale = 0.1 // Depth variation based on brightness

    // Sample pixels proportionally to create the shape
    const samplesPerPixel = Math.max(1, Math.floor(particleCount / validPixels.length))
    let particleIndex = 0

    for (let i = 0; i < validPixels.length && particleIndex < particleCount; i++) {
      const pixel = validPixels[i]
      
      // Sample multiple particles per pixel for better coverage
      const samples = i < validPixels.length - 1 ? samplesPerPixel : (particleCount - particleIndex)
      
      for (let s = 0; s < samples && particleIndex < particleCount; s++) {
        // Normalize pixel coordinates to -1 to 1 range (centered)
        const u = (pixel.x / width) * 2 - 1
        const v = 1 - (pixel.y / height) * 2 // Flip Y axis
        
        // Calculate brightness for depth
        const brightness = (pixel.r + pixel.g + pixel.b) / (3 * 255)
        const depth = (brightness - 0.5) * depthScale
        
        // Map to 3D plane with slight depth variation
        // Scale by aspect ratio to maintain image proportions
        positions[particleIndex * 3] = u * scale * Math.min(1, aspectRatio)
        positions[particleIndex * 3 + 1] = v * scale * Math.min(1, 1 / aspectRatio)
        positions[particleIndex * 3 + 2] = depth
        
        // Use pixel color
        colors[particleIndex * 3] = pixel.r / 255
        colors[particleIndex * 3 + 1] = pixel.g / 255
        colors[particleIndex * 3 + 2] = pixel.b / 255
        
        particleIndex++
      }
    }
    
    // Fill remaining particles if needed
    while (particleIndex < particleCount) {
      const pixel = validPixels[Math.floor(Math.random() * validPixels.length)]
      const u = (pixel.x / width) * 2 - 1
      const v = 1 - (pixel.y / height) * 2
      const brightness = (pixel.r + pixel.g + pixel.b) / (3 * 255)
      const depth = (brightness - 0.5) * depthScale
      
      positions[particleIndex * 3] = u * scale * Math.min(1, aspectRatio)
      positions[particleIndex * 3 + 1] = v * scale * Math.min(1, 1 / aspectRatio)
      positions[particleIndex * 3 + 2] = depth
      
      colors[particleIndex * 3] = pixel.r / 255
      colors[particleIndex * 3 + 1] = pixel.g / 255
      colors[particleIndex * 3 + 2] = pixel.b / 255
      
      particleIndex++
    }

    return { positions, colors }
  }, [imageData, imageDimensions])

  // Animate the particles
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
      />
    </points>
  )
}
