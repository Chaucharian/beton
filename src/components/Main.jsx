import React, {
  useEffect,
  useRef,
  useContext,
  createContext,
  Suspense,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Pages } from "../components/Pages";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
import state from "../store";
import { Html } from "./Html";
import Loader from './Loader';

const Portal = createContext(null);

export const usePortal = () => {
  const context = useContext(Portal);

  if (context === undefined) {
    throw new Error("usePortal must be used inside Portal.Provider");
  }
  return context;
};


export default function App() {
  const { progress, errors } = useProgress();
  const [events, setEvents] = useState();

  const scrollArea = useRef();
  const domContent = useRef();

  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas
          className="canvas"
          orthographic
          camera={{ zoom: state.zoom, position: [0, 0, 500] }}
          onCreated={({ gl, events }) => {
            // gl.setClearColor('white')
            // gl.toneMappingExposure = 2.5
            // gl.toneMappingWhitePoint = 1
            // Export canvas events, we will put them onto the scroll area
            setEvents(events);
          }}
        >
          <Portal.Provider value={domContent}>
            <Pages />
            <OrbitControls />
            <Environment preset="sunset" />
          </Portal.Provider>
        </Canvas>
      </Suspense>
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        // {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }}></div>
      </div>
    </>
  );
}
