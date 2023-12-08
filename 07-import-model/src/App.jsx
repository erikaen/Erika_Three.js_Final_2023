import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel1, loadedModel2;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/fibonacci_sphere/scene.gltf', (gltfScene) => {
      loadedModel1 = gltfScene;
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(0.2, 0.2, 0.2);
      test.scene.add(gltfScene.scene);
      loadedModel1.scene.traverse((child) => {
        if (child.isMesh) {
          // Set transparent material
          child.material.transparent = true;
        }
      });
    });

    gltfLoader.load('./assets/ornate_sphere/scene.gltf', (gltfScene2) => {
      loadedModel2 = gltfScene2;
      gltfScene2.scene.rotation.y = Math.PI / 8;
      gltfScene2.scene.position.y = 3;
      gltfScene2.scene.scale.set(0.2, 0.2, 0.2);
      test.scene.add(gltfScene2.scene);
      loadedModel2.scene.traverse((child) => {
        if (child.isMesh) {
          // Set transparent material
          child.material.transparent = true;
        }
      });
    });

    const animate = () => {
      if (loadedModel1 && loadedModel2) {
        loadedModel1.scene.rotation.x += 0.005;
        loadedModel1.scene.rotation.y += 0.005;
        loadedModel1.scene.rotation.z += 0.005;

        loadedModel2.scene.rotation.x += 0.005;
        loadedModel2.scene.rotation.y += 0.005;
        loadedModel2.scene.rotation.z += 0.005;
      }

      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    
      if (loadedModel1 && loadedModel2) {
        // Normalize mouseX to be in the range [0, 1]
        const normalizedMouseX = (mouseX + 1) / 2;
    
        // Gradual change in opacity based on mouse position
        loadedModel1.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.opacity = 1 - normalizedMouseX;
          }
        });
    
        loadedModel2.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.opacity = normalizedMouseX;
          }
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
