"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sphere, Float, Html } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            {/* Position slightly lower and scale correctly */}
            <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5} position={[0, -2, 0]}>
                <MeshDistortMaterial
                    color="#004d2b"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.1}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </Sphere>
        </Float>
    );
}

function Particles() {
    const count = 150;
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -20 + Math.random() * 40;
            const yFactor = -20 + Math.random() * 40;
            const zFactor = -10 - Math.random() * 30; // Push particles slightly backward
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s * 0.1, s * 0.1, s * 0.1);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            if (mesh.current) {
                mesh.current.setMatrixAt(i, dummy.matrix);
            }
        });
        if (mesh.current) {
            mesh.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        // @ts-expect-error Typescript is complaining about the exact spread of args for instancedMesh.
        <instancedMesh ref={mesh} args={[null, null, count]} count={count}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#a4e320" />
        </instancedMesh>
    );
}

function FeatureCard({ position, rotation, title, icon }: { position: [number, number, number], rotation: [number, number, number], title: string, icon: string }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
            <Html transform distanceFactor={14} position={position} rotation={rotation} zIndexRange={[100, 0]} className="pointer-events-none">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-64 md:w-72 shadow-[0_20px_50px_rgba(0,77,43,0.3)] flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-[#a4e320] flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(164,227,32,0.4)] border border-white/40 shrink-0">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-white font-extrabold text-lg leading-tight drop-shadow-md">{title}</h3>
                    </div>
                </div>
            </Html>
        </Float>
    );
}

function FloatingCards() {
    return (
        <>
            <FeatureCard
                position={[-6, 3.5, -5]}
                rotation={[0, 0.3, -0.05]}
                title="Real-time Market Insights"
                icon="📈"
            />
            <FeatureCard
                position={[6, 4, -8]}
                rotation={[0, -0.4, 0.1]}
                title="Direct Equipment Rentals"
                icon="🚜"
            />
            <FeatureCard
                position={[-6.5, -2, -3]}
                rotation={[0, 0.5, 0.1]}
                title="AI Crop Disease Scanner"
                icon="📸"
            />
            <FeatureCard
                position={[6, -2.5, -4]}
                rotation={[0, -0.3, -0.05]}
                title="Expert Farming Community"
                icon="👨‍🌾"
            />
        </>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-x-0 bottom-0 h-full w-full pointer-events-none z-10">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={3} color="#a4e320" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ff00" />
                <Particles />
                <Blob />
                <FloatingCards />
                <Environment preset="forest" />
            </Canvas>
        </div>
    );
}
