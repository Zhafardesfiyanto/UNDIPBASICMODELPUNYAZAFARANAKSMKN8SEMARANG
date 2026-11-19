import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { MuseumZone } from './types'
import { PressurePlate } from './PressurePlate'

interface MuseumRoomEnvironmentProps {
  zone: MuseumZone
  onNavigateZone: (zoneId: string) => void
}

const ROOM_WIDTH = 20
const ROOM_LENGTH = 34
const ROOM_HEIGHT = 6.2

/** Procedural dark oak museum parquet texture */
function createMuseumParquetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#26190e'
    ctx.fillRect(0, 0, 1024, 1024)

    const planks = 16
    const w = 1024 / planks
    for (let i = 0; i < planks; i++) {
      const x = i * w
      ctx.fillStyle = i % 2 === 0 ? '#322114' : '#291b10'
      ctx.fillRect(x, 0, w, 1024)

      // Wood grain
      ctx.strokeStyle = 'rgba(0,0,0,0.22)'
      ctx.lineWidth = 1.2
      for (let g = 0; g < 12; g++) {
        ctx.beginPath()
        ctx.moveTo(x + (g * w) / 12, 0)
        ctx.lineTo(x + (g * w) / 12 + Math.sin(g) * 6, 1024)
        ctx.stroke()
      }

      // Plank joints
      ctx.fillStyle = 'rgba(0,0,0,0.6)'
      ctx.fillRect(x, 0, 2, 1024)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(5, 8)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** Procedural Gilded Zone Header Plaque Texture on North Wall */
function createZoneHeaderTexture(zone: MuseumZone): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1500
  canvas.height = 200
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Navy blue enamel base
    ctx.fillStyle = '#0b162c'
    ctx.fillRect(0, 0, 1500, 200)

    // Gold border
    ctx.lineWidth = 6
    ctx.strokeStyle = '#d4af37'
    ctx.strokeRect(8, 8, 1484, 184)

    // Inner fine border
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)'
    ctx.strokeRect(18, 18, 1464, 164)

    // Tag Code
    ctx.textAlign = 'center'
    ctx.fillStyle = '#38bdf8'
    ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif'
    ctx.fillText(`${zone.code} • UNIVERSITAS DIPONEGORO`, 750, 48)

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 42px "Times New Roman", Georgia, serif'
    ctx.fillText(zone.title.toUpperCase(), 750, 102)

    // Subtitle
    ctx.fillStyle = '#d4af37'
    ctx.font = 'italic 22px "Segoe UI", Arial, sans-serif'
    ctx.fillText(zone.subtitle, 750, 146)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function MuseumRoomEnvironment({ zone, onNavigateZone }: MuseumRoomEnvironmentProps) {
  const floorTexture = useMemo(() => createMuseumParquetTexture(), [])
  const headerTexture = useMemo(() => createZoneHeaderTexture(zone), [zone])
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/brand/logo_undip.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setLogoTexture(tex)
    })
  }, [])

  const halfW = ROOM_WIDTH / 2
  const halfL = ROOM_LENGTH / 2

  const prevZoneNumber = zone.number > 1 ? zone.number - 1 : null
  const nextZoneNumber = zone.number < 5 ? zone.number + 1 : null

  return (
    <group>
      {/* 1. Grand Polished Museum Parquet Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_LENGTH]} />
        <meshStandardMaterial map={floorTexture} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 2. Grand Navy & Gold Velvet Carpet Runner down the Center Aisle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[4.2, ROOM_LENGTH - 4]} />
        <meshStandardMaterial color="#0f2347" roughness={0.85} />
      </mesh>
      {/* Gold Carpet Border Trims */}
      {[-2.05, 2.05].map((cx) => (
        <mesh key={`carpet-trim-${cx}`} rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0.008, 0]}>
          <planeGeometry args={[0.08, ROOM_LENGTH - 4]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* 3. High Museum Ceiling with Recessed Panels */}
      <mesh position={[0, ROOM_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_LENGTH]} />
        <meshStandardMaterial color="#f8f5ee" roughness={0.9} />
      </mesh>

      {/* 4. Museum Walls (Ivory Texture) */}
      {/* North Wall (-Z) */}
      <mesh position={[0, ROOM_HEIGHT / 2, -halfL]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f7f1e7" roughness={0.85} />
      </mesh>

      {/* South Wall (+Z) */}
      <mesh position={[0, ROOM_HEIGHT / 2, halfL]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f7f1e7" roughness={0.85} />
      </mesh>

      {/* West Wall (-X) */}
      <mesh position={[-halfW, ROOM_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM_LENGTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f7f1e7" roughness={0.85} />
      </mesh>

      {/* East Wall (+X) */}
      <mesh position={[halfW, ROOM_HEIGHT / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM_LENGTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f7f1e7" roughness={0.85} />
      </mesh>

      {/* 5. Heritage Brown Wainscoting Paneling & Gold Moldings around Perimeter */}
      {[-halfL + 0.05, halfL - 0.05].map((z, idx) => (
        <group key={`wainscot-ns-${idx}`}>
          <mesh position={[0, 0.65, z]} receiveShadow>
            <boxGeometry args={[ROOM_WIDTH, 1.3, 0.1]} />
            <meshStandardMaterial color="#382212" roughness={0.5} metalness={0.12} />
          </mesh>
          <mesh position={[0, 1.32, z]}>
            <boxGeometry args={[ROOM_WIDTH, 0.08, 0.12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {[-halfW + 0.05, halfW - 0.05].map((x, idx) => (
        <group key={`wainscot-ew-${idx}`}>
          <mesh position={[x, 0.65, 0]} receiveShadow>
            <boxGeometry args={[0.1, 1.3, ROOM_LENGTH]} />
            <meshStandardMaterial color="#382212" roughness={0.5} metalness={0.12} />
          </mesh>
          <mesh position={[x, 1.32, 0]}>
            <boxGeometry args={[0.12, 0.08, ROOM_LENGTH]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* =========================================================
          6. ARCHITECTURAL WALL PILASTERS (FLUSH AGAINST WALL)
          Moved flat against the walls between paintings so they
          NEVER block or obstruct the paintings/podium stands!
          ========================================================= */}
      {[-halfW + 0.08, halfW - 0.08].map((pilasterX) =>
        [-12.5, -7.5, -2.5, 2.5, 7.5, 12.5].map((pilasterZ) => (
          <group key={`pilaster-${pilasterX}-${pilasterZ}`} position={[pilasterX, 0, pilasterZ]}>
            {/* Base */}
            <mesh position={[0, 0.65, 0]} castShadow>
              <boxGeometry args={[0.18, 1.35, 0.65]} />
              <meshStandardMaterial color="#382212" roughness={0.5} />
            </mesh>
            {/* Shaft flat against wall */}
            <mesh position={[0, ROOM_HEIGHT / 2 + 0.5, 0]} castShadow>
              <boxGeometry args={[0.12, ROOM_HEIGHT - 1.8, 0.55]} />
              <meshStandardMaterial color="#efece5" roughness={0.4} />
            </mesh>
            {/* Capital */}
            <mesh position={[0, ROOM_HEIGHT - 0.35, 0]} castShadow>
              <boxGeometry args={[0.18, 0.35, 0.65]} />
              <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        )),
      )}

      {/* 4 Grand Corner Columns (At the very corners, never obstructing) */}
      {[-halfW + 0.6, halfW - 0.6].map((cx) =>
        [-halfL + 0.6, halfL - 0.6].map((cz) => (
          <group key={`corner-col-${cx}-${cz}`} position={[cx, 0, cz]}>
            <mesh position={[0, ROOM_HEIGHT / 2, 0]} castShadow>
              <cylinderGeometry args={[0.42, 0.46, ROOM_HEIGHT, 16]} />
              <meshStandardMaterial color="#efece5" roughness={0.3} />
            </mesh>
          </group>
        )),
      )}

      {/* 7. Track Spotlights hanging from Ceiling */}
      {[-7.8, 7.8].map((trackX) => (
        <group key={`track-${trackX}`} position={[trackX, ROOM_HEIGHT - 0.15, 0]}>
          <mesh>
            <boxGeometry args={[0.15, 0.1, ROOM_LENGTH - 4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          {[-10, -5, 0, 5, 10].map((spotZ) => (
            <group key={`spot-${spotZ}`} position={[0, -0.15, spotZ]}>
              <mesh rotation={[trackX > 0 ? -0.35 : 0.35, 0, trackX > 0 ? -0.4 : 0.4]}>
                <cylinderGeometry args={[0.1, 0.15, 0.25, 16]} />
                <meshStandardMaterial color="#334155" metalness={0.8} />
              </mesh>
              <spotLight
                position={[0, 0, 0]}
                target-position={[trackX > 0 ? halfW : -halfW, 2.5, spotZ]}
                intensity={2.4}
                angle={0.55}
                penumbra={0.35}
                color="#fff8ed"
                castShadow
              />
            </group>
          ))}
        </group>
      ))}

      {/* =========================================================
          8. OFFICIAL 2D LOGO UNDIP & ZONE TITLE ON NORTH WALL
          ========================================================= */}
      {/* 2D Logo Undip mounted high on North Wall with transparent background */}
      <group position={[0, 4.85, -halfL + 0.05]}>
        {logoTexture && (
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.26, 1.6]} />
            <meshBasicMaterial map={logoTexture} transparent alphaTest={0.05} />
          </mesh>
        )}
      </group>

      {/* Grand Zone Header Plaque directly beneath logo */}
      <group position={[0, 3.8, -halfL + 0.12]}>
        <mesh castShadow>
          <boxGeometry args={[8.4, 0.85, 0.08]} />
          <meshStandardMaterial color="#0f2347" roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[8.5, 0.95, 0.02]} />
          <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.058]}>
          <planeGeometry args={[8.2, 0.75]} />
          <meshBasicMaterial map={headerTexture} transparent />
        </mesh>
      </group>

      {/* 9. Museum Visitor Benches (Strategically placed away from sightlines) */}
      {[-4.5, 4.5].map((bx) =>
        [-7, 7].map((bz) => (
          <group key={`bench-${bx}-${bz}`} position={[bx, 0.25, bz]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.15, 2.4]} />
              <meshStandardMaterial color="#382212" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.09, 0]}>
              <boxGeometry args={[0.88, 0.06, 2.25]} />
              <meshStandardMaterial color="#0f2347" roughness={0.8} />
            </mesh>
            {[-0.9, 0.9].map((legZ) => (
              <mesh key={legZ} position={[0, -0.13, legZ]}>
                <boxGeometry args={[0.8, 0.26, 0.08]} />
                <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
              </mesh>
            ))}
          </group>
        )),
      )}

      {/* =========================================================
          10. GRAND ARCHWAY PORTALS & INTERACTIVE PRESSURE PLATES
          ========================================================= */}
      {/* Forward Archway Portal (To Next Zone) */}
      {nextZoneNumber && (
        <group>
          <group
            position={[6.5, 0, halfL - 0.2]}
            onClick={() => onNavigateZone(`zona-${nextZoneNumber}`)}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = ''
            }}
          >
            <mesh position={[0, 1.8, 0]} castShadow>
              <boxGeometry args={[2.6, 3.6, 0.25]} />
              <meshStandardMaterial color="#382212" roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.6, 0.08]}>
              <planeGeometry args={[1.9, 3.2]} />
              <meshBasicMaterial color="#0b1730" />
            </mesh>
            <mesh position={[0, 3.8, 0.16]}>
              <boxGeometry args={[2.8, 0.5, 0.08]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>

          {/* Interactive Gaming-style Pressure Plate with Light Beam at Portal Entrance */}
          <PressurePlate
            position={[6.5, 0, halfL - 2.2]}
            onStepOn={() => onNavigateZone(`zona-${nextZoneNumber}`)}
            beamColor="#38bdf8"
            accentColor="#0284c7"
            label={`MENUJU ZONA ${nextZoneNumber}`}
            sublabel="Injak untuk Masuk"
          />
        </group>
      )}

      {/* Backward Archway Portal (To Previous Zone) */}
      {prevZoneNumber && (
        <group>
          <group
            position={[-6.5, 0, halfL - 0.2]}
            onClick={() => onNavigateZone(`zona-${prevZoneNumber}`)}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = ''
            }}
          >
            <mesh position={[0, 1.8, 0]} castShadow>
              <boxGeometry args={[2.6, 3.6, 0.25]} />
              <meshStandardMaterial color="#382212" roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.6, 0.08]}>
              <planeGeometry args={[1.9, 3.2]} />
              <meshBasicMaterial color="#0b1730" />
            </mesh>
            <mesh position={[0, 3.8, 0.16]}>
              <boxGeometry args={[2.8, 0.5, 0.08]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>

          {/* Interactive Gaming-style Pressure Plate with Light Beam at Return Portal */}
          <PressurePlate
            position={[-6.5, 0, halfL - 2.2]}
            onStepOn={() => onNavigateZone(`zona-${prevZoneNumber}`)}
            beamColor="#d4af37"
            accentColor="#c59b27"
            label={`KEMBALI KE ZONA ${prevZoneNumber}`}
            sublabel="Injak untuk Kembali"
          />
        </group>
      )}
    </group>
  )
}
