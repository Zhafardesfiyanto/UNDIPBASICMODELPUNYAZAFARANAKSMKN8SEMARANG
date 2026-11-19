import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { ExhibitItem } from './types'
import { MuseumPodiumStand } from './MuseumPodiumStand'

interface MuseumExhibitsRendererProps {
  exhibits: ExhibitItem[]
  onSelectExhibit: (exhibit: ExhibitItem) => void
  selectedId: string | null
}

/**
 * Creates dignified museum canvas for exhibits without external photos
 */
function createExhibitCanvas(item: ExhibitItem): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 680
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const isRector = item.category.toLowerCase().includes('rektor')

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, 680)
    if (isRector) {
      bg.addColorStop(0, '#2d241c')
      bg.addColorStop(0.5, '#423326')
      bg.addColorStop(1, '#1e1711')
    } else {
      bg.addColorStop(0, '#0a1628')
      bg.addColorStop(0.5, '#132847')
      bg.addColorStop(1, '#08101e')
    }
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 512, 680)

    // Vignette
    const vig = ctx.createRadialGradient(256, 320, 100, 256, 320, 360)
    vig.addColorStop(0, 'rgba(0,0,0,0)')
    vig.addColorStop(1, 'rgba(0,0,0,0.65)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, 512, 680)

    // Gold decorative border
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 4
    ctx.strokeRect(20, 20, 472, 640)

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(28, 28, 456, 624)

    // Header badge
    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 22px "Times New Roman", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 256, 68)

    ctx.fillStyle = '#38bdf8'
    ctx.font = 'bold 15px "Segoe UI", sans-serif'
    ctx.fillText(item.category.toUpperCase(), 256, 96)

    // Center Emblem or Silhouette
    if (isRector) {
      // Silhouette of Rector (Academic Toga & Cap/Collar)
      ctx.fillStyle = 'rgba(25, 18, 12, 0.85)'
      ctx.beginPath()
      ctx.ellipse(256, 440, 175, 140, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(256, 260, 85, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // Elegant Academic Shield / Crest
      ctx.fillStyle = 'rgba(15, 35, 71, 0.7)'
      ctx.beginPath()
      ctx.moveTo(256, 170)
      ctx.lineTo(350, 220)
      ctx.lineTo(350, 340)
      ctx.quadraticCurveTo(256, 420, 256, 430)
      ctx.quadraticCurveTo(256, 420, 162, 340)
      ctx.lineTo(162, 220)
      ctx.closePath()
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = '#d4af37'
      ctx.stroke()

      // Star / Torch in center
      ctx.fillStyle = '#d4af37'
      ctx.beginPath()
      ctx.arc(256, 280, 42, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#0f2347'
      ctx.font = 'bold 36px "Times New Roman", serif'
      ctx.fillText('UNDIP', 256, 292)
    }

    // Divider
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(70, 470)
    ctx.lineTo(442, 470)
    ctx.stroke()

    // Title & Subtitle
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 24px "Times New Roman", Georgia, serif'
    wrapTextCanvas(ctx, item.title, 256, 510, 440, 30)

    if (item.year) {
      ctx.fillStyle = '#d4af37'
      ctx.font = 'italic bold 18px "Segoe UI", sans-serif'
      ctx.fillText(`Tahun: ${item.year}`, 256, 610)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function wrapTextCanvas(
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
      ctx.fillText(line.trim(), x, curY)
      line = words[n] + ' '
      curY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line.trim(), x, curY)
}

export function MuseumExhibitsRenderer({
  exhibits,
  onSelectExhibit,
  selectedId,
}: MuseumExhibitsRendererProps) {
  return (
    <group>
      {exhibits.map((item) => (
        <group key={item.id}>
          {/* Wall Mounted Exhibit / Portrait / Vitrine */}
          <MuseumExhibitPiece
            item={item}
            isSelected={selectedId === item.id}
            onSelect={() => onSelectExhibit(item)}
          />

          {/* 3D Reading Podium Stand in front of the exhibit */}
          {item.podiumPosition && (
            <MuseumPodiumStand
              item={item}
              isSelected={selectedId === item.id}
              onSelect={() => onSelectExhibit(item)}
            />
          )}
        </group>
      ))}
    </group>
  )
}

function MuseumExhibitPiece({
  item,
  isSelected,
  onSelect,
}: {
  item: ExhibitItem
  isSelected: boolean
  onSelect: () => void
}) {
  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const defaultTexture = useMemo(() => createExhibitCanvas(item), [item])

  useEffect(() => {
    if (!item.imagePath) return
    let active = true
    const loader = new THREE.TextureLoader()
    loader.load(
      item.imagePath,
      (tex) => {
        if (!active) {
          tex.dispose()
          return
        }
        tex.colorSpace = THREE.SRGBColorSpace
        setPhotoTexture(tex)
      },
      undefined,
      () => setPhotoTexture(null),
    )
    return () => {
      active = false
    }
  }, [item.imagePath])

  const textureToUse = photoTexture ?? defaultTexture

  return (
    <group
      position={item.position}
      rotation={[0, item.rotationY ?? 0, 0]}
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
      {/* =========================================================
          1. WALL MOUNTED PORTRAIT / HISTORICAL FRAME
          ========================================================= */}
      {item.modelType === 'portrait' && (
        <group>
          {/* Gilded Wood Heavy Museum Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.7, 2.15, 0.1]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.82}
              roughness={0.28}
              emissive={isSelected ? '#d4af37' : isHovered ? '#38bdf8' : '#000000'}
              emissiveIntensity={isSelected ? 0.35 : isHovered ? 0.2 : 0}
            />
          </mesh>

          {/* Ivory Archival Mat */}
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[1.5, 1.95, 0.04]} />
            <meshStandardMaterial color="#f7f3ea" roughness={0.9} />
          </mesh>

          {/* Portrait Canvas Image */}
          <mesh position={[0, 0, 0.07]}>
            <planeGeometry args={[1.34, 1.78]} />
            <meshStandardMaterial map={textureToUse} roughness={0.6} />
          </mesh>

          {/* Picture Spotlight Light Head mounted directly above frame */}
          <mesh position={[0, 1.28, 0.1]}>
            <boxGeometry args={[0.36, 0.08, 0.16]} />
            <meshStandardMaterial color="#c59b27" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Engraved Brass Title Plate mounted directly beneath frame */}
          <mesh position={[0, -1.28, 0.02]}>
            <boxGeometry args={[1.4, 0.26, 0.02]} />
            <meshStandardMaterial color="#c59b27" metalness={0.88} roughness={0.25} />
          </mesh>
        </group>
      )}

      {/* =========================================================
          2. COMMEMORATIVE WALL PLAQUE
          ========================================================= */}
      {item.modelType === 'plaque' && (
        <group>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.4, 2.2, 0.1]} />
            <meshStandardMaterial
              color="#0f2347"
              metalness={0.65}
              roughness={0.35}
              emissive={isSelected ? '#d4af37' : isHovered ? '#38bdf8' : '#000000'}
              emissiveIntensity={isSelected ? 0.35 : isHovered ? 0.15 : 0}
            />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <boxGeometry args={[4.26, 2.06, 0.02]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.068]}>
            <planeGeometry args={[4.1, 1.9]} />
            <meshStandardMaterial color="#091428" roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* =========================================================
          3. FREESTANDING GLASS SHOWCASE VITRINE
          ========================================================= */}
      {item.modelType === 'vitrine' && (
        <group position={[0, 0, 0]}>
          {/* Mahogany Wooden Plinth Base */}
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.9, 0.9]} />
            <meshStandardMaterial
              color="#23170e"
              roughness={0.4}
              emissive={isSelected ? '#d4af37' : isHovered ? '#0284c7' : '#000000'}
              emissiveIntensity={isSelected ? 0.3 : isHovered ? 0.15 : 0}
            />
          </mesh>

          {/* Gilded Plinth Molding Trim */}
          <mesh position={[0, 0.91, 0]}>
            <boxGeometry args={[1.24, 0.03, 0.94]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Royal Velvet Cushion Base */}
          <mesh position={[0, 0.935, 0]} receiveShadow>
            <boxGeometry args={[1.12, 0.03, 0.82]} />
            <meshStandardMaterial color="#0b1730" roughness={0.9} />
          </mesh>

          {/* Glass Vitrine Cube */}
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[1.14, 0.8, 0.84]} />
            <meshStandardMaterial
              color="#f0f9ff"
              transparent
              opacity={0.18}
              roughness={0.05}
              metalness={0.9}
              depthWrite={false}
            />
          </mesh>

          {/* Glass Case Brass Corner Rails */}
          {[-0.56, 0.56].map((cx) =>
            [-0.41, 0.41].map((cz) => (
              <mesh key={`v-corner-${cx}-${cz}`} position={[cx, 1.35, cz]}>
                <boxGeometry args={[0.02, 0.8, 0.02]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
              </mesh>
            )),
          )}
          {/* Glass Case Top Brass Rim */}
          <mesh position={[0, 1.76, 0]}>
            <boxGeometry args={[1.16, 0.02, 0.86]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* 3D Artifact Inside Vitrine (Antique Academic Book / Blueprint Scroll) */}
          <group position={[0, 1.02, 0]}>
            {/* Open Antique Book */}
            <mesh position={[-0.14, 0.02, 0]} rotation={[0, 0, 0.08]} castShadow>
              <boxGeometry args={[0.26, 0.03, 0.36]} />
              <meshStandardMaterial color="#faf6eb" roughness={0.8} />
            </mesh>
            <mesh position={[0.14, 0.02, 0]} rotation={[0, 0, -0.08]} castShadow>
              <boxGeometry args={[0.26, 0.03, 0.36]} />
              <meshStandardMaterial color="#faf6eb" roughness={0.8} />
            </mesh>
            {/* Book Spine */}
            <mesh position={[0, 0.015, 0]}>
              <boxGeometry args={[0.05, 0.02, 0.37]} />
              <meshStandardMaterial color="#6b21a8" roughness={0.6} />
            </mesh>
            {/* Rolled Manuscript Scroll with Gold Ribbon */}
            <mesh position={[0, 0.06, 0.22]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.34, 16]} />
              <meshStandardMaterial color="#fef3c7" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.061, 0.22]}>
              <cylinderGeometry args={[0.027, 0.027, 0.04, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
            </mesh>
          </group>

          {/* Brass Nameplate on Front of Plinth */}
          <group position={[0, 0.5, 0.46]}>
            <mesh>
              <boxGeometry args={[0.7, 0.14, 0.01]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.006]}>
              <boxGeometry args={[0.66, 0.1, 0.005]} />
              <meshStandardMaterial color="#0f2347" roughness={0.4} />
            </mesh>
          </group>

          {/* Internal Vitrine Warm Spotlight */}
          <pointLight position={[0, 1.7, 0]} color="#fffbeb" intensity={1.8} distance={3} />
        </group>
      )}
    </group>
  )
}
