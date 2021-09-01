import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useFBX, OrbitControls } from '@react-three/drei'
import { Physics, usePlane, useSphere } from "@react-three/cannon"

export const Building = () => {
    const fbx = useFBX("house.fbx");
    const ref = useRef()
    const { viewportHeight } = useBlock()
    useFrame(() => {
      const curTop = state.top.current
      const curY = ref.current.rotation.z
      const nextY = (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI
      ref.current.rotation.z = lerp(curY, nextY, 0.1)
    })
  
    return <primitive ref={ref} object={fbx} scale={0.005} />;
  };
  