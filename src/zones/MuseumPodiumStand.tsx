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
      {/* 1. Base disc */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.04, 24]} />
        <meshStandardMaterial color="#1a2333" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.042, 0]}>
        <ringGeometry args={[0.18, 0.21, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 2. Vertical stem — behind and below the tray, fully hidden from front */}
      <mesh position={[0, 0.50, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.96, 16]} />
        <meshStandardMaterial color="#1a2333" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 3. Angled reading tray — tilted toward the visitor (rotation X = -0.42 rad ≈ 24°)
              Positive X rotation tips the top of the board AWAY from visitor (reading angle).
              The plaque text faces FORWARD (+Z direction = toward visitor). */}
      <group position={[0, 1.02, 0.08]} rotation={[-0.4, 0, 0]}>
        {/* Dark navy backing board */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.74, 0.50, 0.025]} />
          <meshStandardMaterial color="#0f2347" metalness={0.4} roughness={0.4} />
        </mesh>

        {/* Gold bezel frame — slightly in front of board */}
        <mesh position={[0, 0, 0.014]}>
          <boxGeometry args={[0.72, 0.48, 0.006]} />
          <meshStandardMaterial
            color={isSelected ? '#38bdf8' : isHovered ? '#ffd700' : '#d4af37'}
            metalness={0.88}
            roughness={0.18}
            emissive={isHovered ? '#c59b27' : '#000000'}
            emissiveIntensity={isHovered ? 0.3 : 0}
          />
        </mesh>

        {/* Plaque texture — rendered IN FRONT of the gold frame */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.68, 0.44]} />
          <meshStandardMaterial map={texture} roughness={0.7} />
        </mesh>

        {/* Reading lip (bottom shelf) */}
        <mesh position={[0, -0.25, 0.022]}>
          <boxGeometry args={[0.74, 0.022, 0.035]} />
          <meshStandardMaterial color="#d4af37" metalness={0.82} roughness={0.2} />
        </mesh>
      </group>

      {/* Warm accent light */}
      <pointLight
        position={[0, 1.4, 0.3]}
        color="#fff8ed"
        intensity={isHovered ? 1.8 : 1.0}
        distance={2.5}
      />
    </group>
  )
}
