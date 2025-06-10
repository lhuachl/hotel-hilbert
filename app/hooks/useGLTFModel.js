import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// 🚀 Cache global para evitar recargar modelos
const modelCache = new Map();
const loaderInstance = new GLTFLoader();
const dracoInstance = new DRACOLoader();

// Configurar Draco una sola vez
if (typeof window !== 'undefined') {
  dracoInstance.setDecoderPath('/draco/');
  loaderInstance.setDRACOLoader(dracoInstance);
}

export function useGLTFModel(url) {
  const [state, setState] = useState({
    scene: null,
    animations: [],
    loading: true,
    error: null,
    progress: 0, // 📊 Progreso de carga
  });

  const mountedRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 🚀 Verificar cache primero
    if (modelCache.has(url)) {
      const cached = modelCache.get(url);
      
      if (cached.error) {
        setState({
          scene: null,
          animations: [],
          loading: false,
          error: cached.error,
          progress: 0,
        });
      } else {
        setState({
          scene: cached.scene.clone(), // Clonar para evitar conflictos
          animations: [...cached.animations],
          loading: false,
          error: null,
          progress: 100,
        });
      }
      return;
    }

    const loadModel = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null, progress: 0 }));
        
        const gltf = await new Promise((resolve, reject) => {
          loaderInstance.load(
            url,
            resolve,
            // 📊 Progreso de carga
            (progress) => {
              const percentage = (progress.loaded / progress.total) * 100;
              if (mountedRef.current) {
                setState(prev => ({ ...prev, progress: percentage }));
              }
            },
            reject
          );
        });

        if (!mountedRef.current) return;

        // 🔧 Optimizar modelo
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            // Optimizaciones de rendering
            child.frustumCulled = true;
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Optimizar geometría
            if (child.geometry) {
              child.geometry.computeBoundingBox();
              child.geometry.computeBoundingSphere();
            }
            
            // Optimizar materiales
            if (child.material) {
              child.material.side = THREE.FrontSide;
              
              // Mejorar calidad de texturas
              if (child.material.map) {
                child.material.map.generateMipmaps = true;
                child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
                child.material.map.magFilter = THREE.LinearFilter;
              }
            }
          }
        });

        // 💾 Guardar en cache
        const cacheData = {
          scene: gltf.scene,
          animations: gltf.animations || [],
          error: null,
        };
        modelCache.set(url, cacheData);

        if (mountedRef.current) {
          setState({
            scene: gltf.scene.clone(),
            animations: [...(gltf.animations || [])],
            loading: false,
            error: null,
            progress: 100,
          });
        }

      } catch (error) {
        console.error(`Error loading model ${url}:`, error);
        
        // Guardar error en cache
        modelCache.set(url, { error: error.message });
        
        if (mountedRef.current) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error instanceof Error ? error.message : 'Error loading model',
            progress: 0,
          }));
        }
      }
    };

    loadModel();

    return () => {
      mountedRef.current = false;
    };
  }, [url]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return state;
}

// 🧹 Función para limpiar cache (opcional)
export function clearModelCache() {
  modelCache.clear();
}

// 📦 Función para precargar modelos
export function preloadModel(url) {
  if (typeof window === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    if (modelCache.has(url)) {
      resolve(modelCache.get(url));
      return;
    }

    loaderInstance.load(url, 
      (gltf) => {
        modelCache.set(url, {
          scene: gltf.scene,
          animations: gltf.animations || [],
          error: null,
        });
        resolve(gltf);
      },
      undefined,
      reject
    );
  });
}