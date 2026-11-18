import { useMemo, useState } from 'react'
import * as THREE from 'three'
import type { ExhibitItem } from './types'

interface MuseumPodiumStandProps {
  item: ExhibitItem
  onSelect: () => void
  isSelected: boolean
}

/**
 * Creates high-resolution procedural brass & ivory museum plaque texture
 */
function createPodiumPlacardTexture(item: ExhibitItem): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Ivory / Cream museum paper background
    ctx.fillStyle = '#faf6ef'
    ctx.fillRect(0, 0, 1024, 640)

    // Outer Gilded Brass Border
    ctx.lineWidth = 14
    ctx.strokeStyle = '#c59b27'
    ctx.strokeRect(16, 16, 992, 608)

    // Inner Fine Navy Border
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(15, 35, 71, 0.45)'
    ctx.strokeRect(32, 32, 960, 576)

    // Header Navy Bar
    ctx.fillStyle = '#0f2347'
    ctx.fillRect(44, 44, 936, 68)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 30px "Times New Roman", Georgia, serif'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 512, 88)

    // Exhibit / Rector Name
    ctx.fillStyle = '#0f2347'
    ctx.font = 'bold 44px "Times New Roman", Georgia, serif'
    ctx.fillText(item.title, 512, 185)

    // Period / Subtitle
    ctx.fillStyle = '#b45309'
    ctx.font = 'italic bold 30px "Segoe UI", Arial, sans-serif'
    ctx.fillText(item.subtitle, 512, 240)

    // Gold Divider line
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(140, 275)
    ctx.lineTo(884, 275)
    ctx.stroke()

    // Description text
    ctx.fillStyle = '#334155'
    ctx.font = '500 27px "Segoe UI", Arial, sans-serif'
    const textToWrap = item.plaqueSummary ?? item.description
    wrapText(ctx, textToWrap, 512, 335, 840, 42)

    // Bottom Action Prompt
    ctx.fillStyle = '#0284c7'
    ctx.font = 'bold italic 22px "Segoe UI", sans-serif'
    ctx.fillText('[ Klik untuk Membaca Riwayat & Arsip Lengkap ]', 512, 590)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ')
  let line = ''
  let curY = y
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, curY)
      line = words[n] + ' '
      curY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, curY)
}

export function MuseumPodiumStand({ item, onSelect, isSelected }: MuseumPodiumStandProps) {
  const [isHovered, setIsHovered] = useState(false)
  const texture = useMemo(() => createPodiumPlacardTexture(item), [item])

  if (!item.podiumPosition) return null

  return (
    <group
      position={item.podiumPosition}
      rotation={[0, item.podiumRotationY ?? 0, 0]}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setIsHovered(false)
        document.body.style.cursor = ''
      }}
    >
      {/* 1. Heavy Cast-Iron / Brass Round Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.04, 24]} />
        <meshStandardMaterial color="#1a2333" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Gold Trim Ring on Base */}
      <mesh position={[0, 0.042, 0]}>
        <ringGeometry args={[0.18, 0.21, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 2. Vertical Upright Stem — Placed cleanly BEHIND the reading surface */}
      <mesh position={[0, 0.46, -0.12]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.84, 16]} />
        <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Angled Neck Connector joining stem to tray back */}
      <mesh position={[0, 0.90, -0.06]} rotation={[-0.45, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.16, 16]} />
        <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Rear Mounting Hub Plate (Behind the tray) */}
      <mesh position={[0, 0.98, -0.025]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[0.16, 0.16, 0.02]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 3. Angled Head Bracket (Facing toward visitor, 100% unobstructed) */}
      <group position={[0, 0.98, 0]} rotation={[0.42, 0, 0]}>
        {/* Backing Tray Board */}
        <mesh position={[0, 0, -0.012]} castShadow receiveShadow>
          <boxGeometry args={[0.74, 0.48, 0.02]} />
          <meshStandardMaterial
            color="#0f2347"
            metalness={0.5}
            roughness={0.35}
          />
        </mesh>

        {/* Gilded Bezel Frame with hover highlight */}
        <mesh position={[0, 0, 0.002]}>
          <boxGeometry args={[0.72, 0.46, 0.006]} />
          <meshStandardMaterial
            color={isSelected ? '#38bdf8' : isHovered ? '#ffd700' : '#d4af37'}
            metalness={0.85}
            roughness={0.2}
            emissive={isHovered ? '#d4af37' : '#000000'}
            emissiveIntensity={isHovered ? 0.25 : 0}
          />
        </mesh>

        {/* Printed Plaque Surface Texture */}
        <mesh position={[0, 0, 0.008]}>
          <planeGeometry args={[0.7, 0.44]} />
          <meshStandardMaterial map={texture} roughness={0.65} />
        </mesh>

        {/* Reading Lip Shelf at the bottom of the tray */}
        <mesh position={[0, -0.23, 0.016]}>
          <boxGeometry args={[0.74, 0.02, 0.03]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>
      </group>

      {/* Subtle Warm Downlight highlighting the stand */}
      <pointLight
        position={[0, 1.4, 0.25]}
        color="#fff8ed"
        intensity={isHovered ? 1.6 : 0.9}
        distance={2.5}
      />
    </group>
  )
}
