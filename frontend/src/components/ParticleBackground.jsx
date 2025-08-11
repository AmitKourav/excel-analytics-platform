// src/components/ParticleBackground.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
    const mountRef = useRef(null);
    const requestRef = useRef(null);
    const clock = new THREE.Clock();

    useEffect(() => {
        // === Scene ===
        const scene = new THREE.Scene();

        // === Camera ===
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 100;

        // === Renderer ===
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance", // Suggest GPU usage
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Retina-friendly

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // === Particles Geometry ===
        const particlesCount = 150;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 300;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const material = new THREE.PointsMaterial({
            color: "#0d6efd",
            size: 2,
            transparent: true,
            opacity: 0.8,
            depthWrite: false, // Improves blending performance
            blending: THREE.AdditiveBlending, // Glow-like effect
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // === Animation Loop ===
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Rotate based on time (frame-rate independent)
            points.rotation.x = elapsedTime * 0.05;
            points.rotation.y = elapsedTime * 0.1;

            renderer.render(scene, camera);
            requestRef.current = requestAnimationFrame(animate);
        };
        animate();

        // === Resize Handling ===
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener("resize", handleResize);

        // === Cleanup ===
        return () => {
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);

            geometry.dispose();
            material.dispose();
            renderer.dispose();

            if (renderer.domElement?.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -1,
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        />
    );
}
