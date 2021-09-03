import React from "react";
import { useGLTF } from "@react-three/drei";
import { useRotateOnScroll } from '../hooks';

export default function Building(props) {
  const { nodes, materials } = useGLTF('/static/building.glb');
  const ref = useRotateOnScroll();

  return (
    <group scale={[0.008, 0.008, 0.008]} rotation={[-Math.PI / 3, 0, 0]} ref={ref} dispose={null} {...props} >
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