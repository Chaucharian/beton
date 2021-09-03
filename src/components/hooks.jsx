import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";
import { useBlock } from './Block';
import state from "../store";

export function useWobble(factor = 1, fn = "sin", cb) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math[fn](t) * factor;
    if (cb) cb(t, ref.current);
  });
  return ref;
}
export const useRotate = (factor = 0.5) => {
  const ref = useRef();
  useFrame((state) => {
    const nextY = state.clock.getElapsedTime() * Math.PI * factor;
    ref.current.rotation.z = lerp(ref.current?.rotation.z, nextY, 0.1);
  });
  return ref;
};
export const useRotateOnScroll = (factor = 4) => {
    const ref = useRef();
    const { viewportHeight } = useBlock();

    useFrame(() => {
        const curTop = state.top.current;
        const curY = ref.current?.rotation.z;
        const nextY = (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI * factor;
        ref.current.rotation.z = lerp(curY, nextY, 0.1);
    });
    return ref;
  };
  


