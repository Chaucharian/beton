import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFBX, OrbitControls, useGLTF } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { useBlock } from "../Block";
import state from "../../store";
import lerp from "lerp";
import { useWobble } from "../hooks";

export default function Helmet(props) {
  const { nodes, materials } = useGLTF("/static/helmet.glb");
  const [hovered, set] = useState(false);
  const ref = useWobble(0.5, "cos");
  useFrame(
    () =>
      (ref.current.rotation.x =
        ref.current.rotation.y =
        ref.current.rotation.z +=
          0.01)
  );

  return (
      <group scale={[0.008, 0.008, 0.008]} ref={ref} dispose={null} {...props}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["11188028"].geometry}
          material={nodes["11188028"].material}
          onPointerMove={() => console.log("MOVING")}
          onPointerOver={() => {
            console.log(" EA ");
            set(true);
          }}
          onPointerOut={() => set(false)}
        >
          {/* <meshStandardMaterial attach="material" color={'hotpink'} /> */}
          <meshStandardMaterial
            attach="material"
            color={hovered ? "hotpink" : "white"}
          />
        </mesh>
      </group>
  );
}