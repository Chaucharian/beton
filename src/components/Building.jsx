import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFBX, OrbitControls, useGLTF } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { useBlock } from "./Block";
import state from "../store";
import lerp from "lerp";

export default function Model(props) {
  const { nodes, materials } = useGLTF('/static/helmet.glb')
  const [hovered, set] = useState(false)
  const ref = useWobble(0.5, 'cos')
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))

  return (
    <group ref={ref} dispose={null} onPointerOver={() => set(true)} onPointerOut={() => set(false)}  {...props} >
      <group scale={[0.008, 0.008, 0.008]}>
        <mesh
        // color={hovered ? 'red' : 'blue'}
          castShadow
          receiveShadow
          geometry={nodes['11188028'].geometry}
          material={nodes['11188028'].material}
        >
          <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'white'} />
          </mesh>
      </group>
    </group> 
  )
}



function useWobble(factor = 1, fn = 'sin', cb) {
  const ref = useRef()
  useFrame(state => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = Math[fn](t) * factor
    if (cb) cb(t, ref.current)
  })
  return ref
}

export function Box(props) {
  const [hovered, set] = useState(false)
  const ref = useWobble(0.5, 'cos')
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <mesh ref={ref} {...props} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'white'} />
    </mesh>
  )
}

export const Building = () => {
  // const fbx = useFBX("house.fbx");
  const fbx = useLoader(GLTFLoader,"static/helmet.glb");
  const ref = useRef();
  const { viewportHeight } = useBlock();
  useFrame(() => {
    const curTop = state.top.current;
    const curY = ref.current?.rotation.z;
    const nextY = (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI;
    ref.current.rotation.z = lerp(curY, nextY, 0.1);
  });

  return (
    <Suspense fallback={null}>
      <primitive ref={ref} object={fbx.scene} scale={0.005} />
    </Suspense>
  );
};
