interface ModernLightingProps {
  castShadows?: boolean
}

export function ModernLighting({ castShadows = true }: ModernLightingProps) {
  return (
    <>
      {/* Bright gallery ambient light */}
      <ambientLight color="#ffffff" intensity={1.1} />

      {/* Main architectural key light from top-front */}
      <directionalLight
        position={[4, 9, 5]}
        intensity={1.4}
        castShadow={castShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
        color="#f8fafc"
      />

      {/* Soft fill light from opposite corner to eliminate harsh dark corners */}
      <directionalLight position={[-6, 7, -6]} intensity={0.65} color="#e2e8f0" />

      {/* Center showcase spotlight */}
      <spotLight
        position={[0, 5.8, 0]}
        target-position={[0, 0, 0]}
        intensity={2.8}
        angle={0.6}
        penumbra={0.5}
        color="#ffffff"
        castShadow={castShadows}
      />
    </>
  )
}
