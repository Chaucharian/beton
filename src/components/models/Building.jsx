import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFBX, OrbitControls, useGLTF } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { useBlock } from "../Block";
import state from "../../store";
import lerp from "lerp";

export default function Building(props) {
  const { nodes, materials } = useGLTF('/static/building.glb');
  const ref = useWobble(0.5, 'cos');
  // const ref = useRef();
  const { viewportHeight } = useBlock();
  useFrame(() => {
    const curTop = state.top.current;
    const curY = ref.current?.rotation.z;
    const nextY = (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI;
    ref.current.rotation.z = lerp(curY, nextY, 0.1);
  });

  return (
    <group scale={[0.008, 0.008, 0.008]} position={[0,0,-2]}  rotation={[-Math.PI / 3, 0, 0]}  ref={ref} dispose={null} {...props}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['11343047'].geometry}
          material={nodes['11343047'].material}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
          />
          </mesh>
      </group>
  )
}

function useWobble(factor = 1, fn = "sin", cb) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math[fn](t) * factor;
    ref.current.position.x = Math[fn](t) * factor;
    if (cb) cb(t, ref.current);
  });
  return ref;
}