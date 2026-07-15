/**
 * ThreeBackground.jsx
 * Lightweight Three.js particle field + floating wireframe sphere.
 *
 * Performance rules enforced here:
 *  – Particle count halved on mobile (< 768px)
 *  – Animation paused when browser tab is hidden (Page Visibility API)
 *  – Fully disabled when prefers-reduced-motion is set
 *  – CSS gradient fallback shown when WebGL is unavailable
 *  – Lazy-loaded via React.lazy in App.jsx
 */
import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

// ── Particle field ────────────────────────────────────────────────────────────
function Particles({ count }) {
  const mesh = useRef()

  // Generate random positions once
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      spd[i] = Math.random() * 0.003 + 0.001
    }
    return [pos, spd]
  }, [count])

  useFrame(() => {
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i]
      // Wrap particles that drift off the top
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#63b3ed"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

// ── Rotating wireframe sphere ─────────────────────────────────────────────────
function WireSphere() {
  const mesh = useRef()

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.08
    mesh.current.rotation.y += delta * 0.12
  })

  return (
    <mesh ref={mesh} position={[3.5, 0, -3]}>
      <sphereGeometry args={[1.8, 16, 16]} />
      <meshBasicMaterial color="#9f7aea" wireframe transparent opacity={0.18} />
    </mesh>
  )
}

// ── Secondary floating torus ring ────────────────────────────────────────────
function SmallSphere() {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.4
    mesh.current.rotation.z += 0.005
  })

  return (
    <mesh ref={mesh} position={[-3.5, 1, -2]}>
      <torusGeometry args={[0.9, 0.02, 8, 60]} />
      <meshBasicMaterial color="#4fd1c5" transparent opacity={0.25} />
    </mesh>
  )
}

// ── Pause animation when tab hidden ──────────────────────────────────────────
function PauseOnHide() {
  const { gl } = useThree()
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null)
      } else {
        gl.setAnimationLoop(() => {})
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [gl])
  return null
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ThreeBackground() {
  // Respect reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return <CssFallback />

  const isMobile = window.innerWidth < 768
  const particleCount = isMobile ? 80 : 160

  return (
    <div
      className="three-canvas"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0) // transparent background
        }}
        fallback={<CssFallback />}
      >
        <PauseOnHide />
        <Particles count={particleCount} />
        <WireSphere />
        <SmallSphere />
      </Canvas>
    </div>
  )
}

// ── CSS gradient fallback (no WebGL) ─────────────────────────────────────────
function CssFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(99,179,237,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(159,122,234,0.05) 0%, transparent 60%)',
      }}
    />
  )
}
