import { useEffect, useRef } from 'react';
import * as THREE from 'three';

'use client';


export default function HistoriaCard() {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Golden infinity symbol geometry
        const curve = new THREE.Curve();
        curve.getPoint = function(t) {
            const scale = 2;
            const x = scale * Math.cos(t * 2 * Math.PI) / (1 + Math.sin(t * 2 * Math.PI) ** 2);
            const y = scale * Math.sin(t * 2 * Math.PI) * Math.cos(t * 2 * Math.PI) / (1 + Math.sin(t * 2 * Math.PI) ** 2);
            return new THREE.Vector3(x, y, 0);
        };

        const geometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, true);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xFFD700,
            shininess: 100,
            specular: 0xFFFFFF
        });

        const infinityMesh = new THREE.Mesh(geometry, material);
        scene.add(infinityMesh);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        camera.position.z = 5;
        sceneRef.current = { scene, camera, renderer, infinityMesh };

        // Animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            
            if (infinityMesh) {
                infinityMesh.rotation.z += 0.01;
                infinityMesh.rotation.y += 0.005;
            }
            
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* 3D Scene */}
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div 
                                ref={mountRef} 
                                className="w-[300px] h-[300px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-yellow-500/10 pointer-events-none" />
                        </div>
                    </div>

                    {/* Historia */}
                    <div className="text-white space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                                La Paradoja del Hotel Infinito
                            </h2>
                            
                            <div className="text-gray-300 space-y-4 leading-relaxed">
                                <p>
                                    Imagine un hotel con infinitas habitaciones, todas ocupadas. 
                                    Un nuevo huésped llega: ¿es posible hospedarlo?
                                </p>
                                
                                <p>
                                    <strong className="text-yellow-400">David Hilbert</strong> propuso esta paradoja 
                                    para ilustrar las propiedades contraintuitivas del infinito.
                                </p>
                                
                                <p>
                                    La solución: mover cada huésped de la habitación <em>n</em> a la 
                                    habitación <em>n+1</em>, liberando así la habitación 1 para el nuevo huésped.
                                </p>
                                
                                <p className="text-yellow-300 font-medium">
                                    ∞ + 1 = ∞
                                </p>
                                
                                <p className="text-sm text-gray-400">
                                    Esta paradoja demuestra que el infinito no se comporta como 
                                    los números finitos, abriendo fascinantes preguntas sobre 
                                    la naturaleza de lo infinito.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}