import lerp from "lerp"
import React, { Suspense, useRef, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader, LinearFilter } from "three"
import { Block, useBlock } from "./Block"
import state from "../store"
import "../utils/CustomMaterial";
import { Html } from './Html';
import Building from './Building';

function Plane({ color = "white", map, ...props }) {
    const { viewportHeight, offsetFactor } = useBlock()
    const material = useRef()
    let last = state.top.current
    useFrame(() => {
      const { pages, top } = state
      material.current.scale = lerp(material.current.scale, offsetFactor - top.current / ((pages - 1) * viewportHeight), 0.1)
      material.current.shift = lerp(material.current.shift, (top.current - last) / 150, 0.1)
      last = top.current
    })
    return (
      <mesh {...props}>
        <planeBufferGeometry attach="geometry" args={[1, 1, 32, 32]} />
        <customMaterial ref={material} attach="material" color={color} map={map} />
      </mesh>
    )
  }

function Content({ left, children, map }) {
    const { contentMaxWidth, canvasWidth, margin } = useBlock()
    const aspect = 1.75
    const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
    return (
      <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
        <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} color="#bfe2ca" map={map} />
        {children}
      </group>
    )
  }
  

function Stripe() {
    const { contentMaxWidth } = useBlock()
    return <Plane scale={[100, contentMaxWidth, 1]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -1]} color="#da0d07" />
  }

export function Pages() {
    const textures = useLoader(TextureLoader, state.images)
    const [img1, img2, img3] = textures.map(texture => ((texture.minFilter = LinearFilter), texture))
    const { contentMaxWidth, mobile } = useBlock()
    const aspect = 1.75
    const pixelWidth = contentMaxWidth * state.zoom
    return (
      <>
        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content map={img2}>
            <Building scale={[0.8, 0.8, 0.8]} />
            <Html>
              <h1><span style={{ color: "#da0d07" }}>Betón</span></h1><h2> es una empresa constructora que hace realidad tus ideas</h2>
            </Html>
            {/* <Dom style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
              The substance can take you to heaven but it can also take you to hell.
            </Dom> */}
          </Content>
        </Block>
        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content map={img1}>
            
          <Html>
              <h1>Desde los cimientos</h1>
            </Html>
            {/* <Dom style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "right" }} position={[mobile ? -contentMaxWidth / 2 : 0, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
              We’ve found that the people whose EEG doesn’t show any alpha-wave activity when they’re relaxed aren’t likely to respond significantly to the substance.
            </Dom> */}
          </Content>
        </Block>
        {/* Stripe */}
        <Block factor={-1.0} offset={2}>
          <Stripe />
        </Block>
        {/* Last section */}
        <Block factor={1.5} offset={3}>
          <Content left map={img3}>
            <Block factor={-0.5}>
              {/* <Cross /> */}
            </Block>
            {/* <Dom prepend style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
              Education and enlightenment.
            </Dom> */}
          </Content>
        </Block>
      </>
    )
  }
  