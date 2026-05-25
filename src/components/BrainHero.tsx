import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef, Suspense, type RefObject } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────────
 * BrainHero — animated 3D scene mirroring the GrayBit logo's motif:
 *   - Silver wireframe icosahedron (the brain)
 *   - Floating outer ring (synaptic field)
 *   - Electric-blue pixel cube swarm (the dissolving "Bit" pixels)
 * Follows hero-level pointer with smooth tilt (not tied to canvas hover).
 * ────────────────────────────────────────────────────────────────────────── */

export type HeroPointer = { x: number; y: number };

function ParallaxRig({
  children,
  pointerRef,
}: {
  children: React.ReactNode;
  pointerRef: RefObject<HeroPointer>;
}) {
  const group = useRef<THREE.Group>(null!);
  const smooth = useRef({ x: 0, y: 0, ry: 0, rx: 0 });

  useFrame((_, delta) => {
    if (!group.current) return;

    const mx = pointerRef.current?.x ?? 0;
    const my = pointerRef.current?.y ?? 0;
    // Frame-rate independent easing — responsive but not snappy/jittery.
    const k = 1 - Math.exp(-5 * delta);

    smooth.current.x += (mx * 0.42 - smooth.current.x) * k;
    smooth.current.y += (my * 0.3 - smooth.current.y) * k;
    smooth.current.ry += (mx * 0.38 - smooth.current.ry) * k;
    smooth.current.rx += (my * 0.24 - smooth.current.rx) * k;

    group.current.position.x = smooth.current.x;
    group.current.position.y = smooth.current.y;
    group.current.rotation.y = smooth.current.ry;
    group.current.rotation.x = smooth.current.rx;
  });

  return <group ref={group}>{children}</group>;
}

function BrainCore() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.18;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.12;
  });

  return (
    <group ref={group}>
      {/* Silver solid core (dim — provides depth) */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#a8aab4"
          metalness={0.95}
          roughness={0.25}
          flatShading
        />
      </mesh>

      {/* Bright wireframe overlay */}
      <mesh scale={1.005}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#e6e8ee" wireframe transparent opacity={0.45} />
      </mesh>

      {/* Mid wireframe ring */}
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#3d7eff" wireframe transparent opacity={0.32} />
      </mesh>

      {/* Outer faint wireframe shell */}
      <mesh scale={1.75}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#5288ff" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

interface CubeData {
  basePos: THREE.Vector3;
  phase: number;
  speed: number;
  rotSpeed: THREE.Vector3;
  scale: number;
  amplitude: number;
  driftDir: THREE.Vector3;
}

function PixelSwarm({ count = 320 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color("#3d7eff"), []);

  const data = useMemo<CubeData[]>(() => {
    const arr: CubeData[] = [];
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell, biased to the right hemisphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8 + Math.random() * 1.5;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) * 0.6;

      arr.push({
        basePos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.35,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
        ),
        scale: 0.025 + Math.random() * 0.055,
        amplitude: 0.15 + Math.random() * 0.35,
        driftDir: new THREE.Vector3(
          Math.random() * 0.6 + 0.2,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
        ).normalize(),
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const d = data[i];
      const wave = Math.sin(t * d.speed + d.phase);
      const drift = (Math.sin(t * 0.2 + d.phase) + 1) * 0.5; // 0-1 dissolve cycle

      const x = d.basePos.x + d.driftDir.x * drift * d.amplitude + wave * 0.12;
      const y = d.basePos.y + d.driftDir.y * drift * d.amplitude + Math.cos(t * d.speed + d.phase) * 0.12;
      const z = d.basePos.z + d.driftDir.z * drift * d.amplitude;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        t * d.rotSpeed.x,
        t * d.rotSpeed.y,
        t * d.rotSpeed.z,
      );
      const s = d.scale * (0.7 + wave * 0.3);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        metalness={0.7}
        roughness={0.3}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function SceneContents({ pointerRef }: { pointerRef: RefObject<HeroPointer> }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, -2, 4]} color="#3d7eff" intensity={3} distance={10} />
      <pointLight position={[4, 2, -2]} color="#7cb4ff" intensity={1.8} distance={8} />

      <ParallaxRig pointerRef={pointerRef}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.4}>
          <BrainCore />
        </Float>

        <PixelSwarm count={320} />
      </ParallaxRig>
    </>
  );
}

export default function BrainHero({
  className = "",
  pointerRef,
}: {
  className?: string;
  pointerRef: RefObject<HeroPointer>;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <SceneContents pointerRef={pointerRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
