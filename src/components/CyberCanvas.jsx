import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberCanvas({ mode = "cosmic" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Constellation
    const particleCount = 850;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xc084fc), // Purple
      new THREE.Color(0x34d399), // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1400;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 2.5 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Shader / Material
    const pMaterial = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Floating 3D Cyber Core Shape (Wireframe Icosahedron & Ring)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(280, 80, -100);

    const icoGeo = new THREE.IcosahedronGeometry(120, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    const ringGeo = new THREE.TorusGeometry(170, 1.2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    const innerRingGeo = new THREE.TorusGeometry(140, 0.8, 16, 80);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.y = Math.PI / 4;
    coreGroup.add(innerRing);

    scene.add(coreGroup);

    // Dynamic Shockwave Rings on Click
    const shockwaves = [];
    const createShockwave = (x, y) => {
      // Map 2D screen coordinates to rough 3D space
      const vector = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const ringGeometry = new THREE.RingGeometry(5, 7, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const wave = new THREE.Mesh(ringGeometry, ringMaterial);
      wave.position.set(pos.x, pos.y, pos.z);
      scene.add(wave);
      shockwaves.push({ mesh: wave, scale: 1, opacity: 0.8 });
    };

    const handleWindowClick = (e) => {
      createShockwave(e.clientX, e.clientY);
    };
    window.addEventListener("click", handleWindowClick);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Window Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationId;
    const startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth camera dampening
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 0.3;
      camera.position.y = -targetY * 0.3;
      camera.lookAt(scene.position);

      // Rotate particle cloud
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

      // Animate core geometric hub
      coreGroup.rotation.y = elapsed * 0.2;
      coreGroup.rotation.x = elapsed * 0.15;
      ringMesh.rotation.z = elapsed * 0.3;
      innerRing.rotation.y = -elapsed * 0.25;

      // Pulse particle positions gently
      const posAttr = geometry.attributes.position;
      const count = posAttr.count;
      for (let i = 0; i < count; i += 10) {
        let y = posAttr.getY(i);
        posAttr.setY(i, y + Math.sin(elapsed * 2 + i) * 0.2);
      }
      posAttr.needsUpdate = true;

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 2.5;
        sw.opacity -= 0.02;
        sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
        sw.mesh.material.opacity = sw.opacity;

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          sw.mesh.material.dispose();
          shockwaves.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", handleWindowClick);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      renderer.dispose();
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
}
