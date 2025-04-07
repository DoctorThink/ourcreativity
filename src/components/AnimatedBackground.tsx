import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}

// Define proper types for the material
interface FluidMaterialType extends THREE.ShaderMaterial {
  time: number;
  resolution: THREE.Vector2;
  mouse: THREE.Vector2;
}

// Define shader code as constants for better type checking
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 mouse;
  varying vec2 vUv;

  #define NUM_OCTAVES 5

  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
      mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
      mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
    vec2 mouse_norm = mouse / resolution;
    
    float time_scaled = time * 0.1;
    vec2 q = vec2(0);
    q.x = fbm(uv + 0.1 * time_scaled);
    q.y = fbm(uv + vec2(1.0));
    
    vec2 r = vec2(0);
    r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time_scaled);
    r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time_scaled);
    
    float f = fbm(uv + r);
    
    vec3 base = mix(
      vec3(0.039, 0.039, 0.039),
      vec3(0.961, 0.961, 0.961),
      f * 0.5
    );
    
    base = mix(
      base,
      vec3(0.2, 0.2, 0.2),
      noise(uv * 2.0) * 0.2
    );
    
    float vignette = length(uv);
    base *= 1.0 - vignette * 0.5;
    
    gl_FragColor = vec4(base, 1.0);
  }
`;

const Fluid = () => {
  const materialRef = useRef<THREE.ShaderMaterial>();
  const mesh = useRef<THREE.Mesh>();

  useFrame((state) => {
    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      if (uniforms) {
        uniforms.time.value = state.clock.getElapsedTime();
        uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        
        const mouseX = Math.sin(state.clock.getElapsedTime() * 0.5) * 100;
        const mouseY = Math.cos(state.clock.getElapsedTime() * 0.3) * 100;
        uniforms.mouse.value.set(mouseX, mouseY);
      }
    }
  });

  return (
    <group>
      <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
        <planeGeometry attach="geometry" args={[2, 2]} />
        <shaderMaterial
          ref={materialRef}
          attach="material"
          uniforms={{
            time: { value: 0 },
            resolution: { value: new THREE.Vector2() },
            mouse: { value: new THREE.Vector2() }
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
        />
      </mesh>
    </group>
  );
};

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <Fluid />
      </Canvas>
    </div>
  );
};