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
 * Creates dignified museum canvas placeholder for rectors without local photos
 */
function createRectorPortraitCanvas(item: ExhibitItem): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 680
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Rich vintage oil painting gradient background
    const bg = ctx.createLinearGradient(0, 0, 0, 680)
    bg.addColorStop(0, '#2d241c')
    bg.addColorStop(0.5, '#423326')
    bg.addColorStop(1, '#1e1711')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 512, 680)

    // Vignette
    const vig = ctx.createRadialGradient(256, 320, 100, 256, 320, 360)
    vig.addColorStop(0, 'rgba(0,0,0,0)')
    vig.addColorStop(1, 'rgba(0,0,0,0.65)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, 512, 680)

    // Dignified Silhouette of Rector (Academic Toga & Cap/Collar)
    ctx.fillStyle = 'rgba(25, 18, 12, 0.75)'
    ctx.beginPath()
    ctx.ellipse(256, 700, 195, 160, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(256, 330, 92, 0, Math.PI * 2)
    ctx.fill()

    // Gilded Undip Emblem / Monogram Crest in Center
    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 28px "Times New Roman", Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('UNIVERSITAS DIPONEGORO', 256, 120)

    // Frame title in canvas
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 26px "Times New Roman", Georgia, serif'
    ctx.fillText(item.title, 256, 490)

    ctx.fillStyle = '#d4af37'
    ctx.font = 'italic 20px "Segoe UI", sans-serif'
    ctx.fillText(item.subtitle, 256, 525)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
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
          {/* Wall Mounted Exhibit / Portrait */}
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
  const defaultTexture = useMemo(() => createRectorPortraitCanvas(item), [item])

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
      {item.modelType === 'portrait' && (
        <group>
          {/* Gilded Wood Heavy Museum Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.7, 2.15, 0.1]} />
            <meshStandardMaterial
              color="#d4af37"
              metalness={0.82}
              roughness={0.28}
              emissive={isSelected ? '#d4af37' : isHovered ? '#fbbf24' : '#000000'}
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
    </group>
  )
}
