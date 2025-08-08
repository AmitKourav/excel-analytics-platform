// src/components/ParticleBackground.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
    const mountRef = useRef(null);
    const requestRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

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
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const animate = () => {
            requestRef.current = requestAnimationFrame(animate);
            points.rotation.x += 0.0005;
            points.rotation.y += 0.001;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);

            // Dispose resources
            geometry.dispose();
            material.dispose();
            renderer.dispose();

            // Remove DOM element safely
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
            }}
        />
    );
}
