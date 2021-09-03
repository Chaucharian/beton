import lerp from "lerp";
import React, { Suspense, useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, LinearFilter } from "three";
import { Block, useBlock } from "./Block";
import state from "../store";
import "../utils/CustomMaterial";
import { Html } from "./Html";
import { Helmet, Building } from "./models";
import { Title, Subtitle } from "./typography";
import ArrowDown from './ArrowDown';
import MountEffect from "./MountEffect";
import { styled } from "styled-components";

function Plane({ color = "white", map, ...props }) {
  const { viewportHeight, offsetFactor } = useBlock();
  const material = useRef();
  let last = state.top.current;
  useFrame(() => {
    const { pages, top } = state;
    material.current.scale = lerp(
      material.current.scale,
      offsetFactor - top.current / ((pages - 1) * viewportHeight),
      0.1
    );
    material.current.shift = lerp(
      material.current.shift,
      (top.current - last) / 150,
      0.1
    );
    last = top.current;
  });
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 32, 32]} />
      <customMaterial
        ref={material}
        attach="material"
        color={color}
        map={map}
      />
    </mesh>
  );
}

function Content({ left, children, map }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock();
  const aspect = 1.75;
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2;
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane
        scale={[contentMaxWidth, contentMaxWidth / aspect, 1]}
        color="#bfe2ca"
        map={map}
      />
      {children}
    </group>
  );
}

function Stripe() {
  const { contentMaxWidth } = useBlock();
  return (
    <Plane
      scale={[100, contentMaxWidth, 1]}
      rotation={[0, 0, Math.PI / 4]}
      position={[0, 0, -1]}
      color="#da0d07"
    />
  );
}

// const Container = styled

export function Pages() {
  const textures = useLoader(TextureLoader, state.images);
  const [img1, img2, img3, img4, img5, img6] = textures.map(
    (texture) => ((texture.minFilter = LinearFilter), texture)
  );
  const { contentMaxWidth, mobile, sectionHeight } = useBlock();
  const aspect = 1.75;
  const pixelWidth = contentMaxWidth * state.zoom;
  return (
    <>
      {/* First section */}
      <Block factor={1.5} offset={0}>
        <Helmet
          position={[-contentMaxWidth / 2, 2, -2]}
          scale={[0.0095, 0.0095, 0.0095]}
        />
        {/* <Building 
        position={[contentMaxWidth / 6, -4, -2]}
        scale={1 / 8000} /> */}
        {/* <Content map={img2}> */}
        <Html style={{ marginTop: "5%", textAlign: "center" }}>
          <MountEffect
            onEnd={() => (
              <MountEffect>
                <Subtitle>50 años de experiencia</Subtitle>
              </MountEffect>
            )}
          >
            <Title primary>Betón</Title>
          </MountEffect>
          <div style={{ position: 'absolute', left: "50%", bottom: "10%" }}>
          <ArrowDown />
          </div>
        </Html>
        {/* </Content> */}
      </Block>

      {/* Second section */}
      <Block factor={2.0} offset={1}>
        <Html style={{ margin: "5%", textAlign: "left" }}>
        <MountEffect>
          <Subtitle>Diseñamos tus ideas</Subtitle>
        </MountEffect>
        </Html>
        <Building 
         position={[contentMaxWidth, -4, -10]}
        scale={1 / 2575} 
        />
        {/* <Content map={img1}>
          <Building scale={1 / 2575} />
        </Content> */}
        {/* <Block factor={2.5} offset={1.5}>
          <Content left map={img5}></Content>
        </Block> */}
      </Block>

      {/* Stripe */}
      <Block factor={-1.0} offset={2}>
        <Html style={{ textAlign: "right", margin: "5%" }}>
          <Subtitle>Desde los cimientos</Subtitle>
        </Html>
        <Content left map={img4}></Content>
        <Stripe />
      </Block>
      {/* Last section */}
      <Block factor={1.5} offset={3}>
      <Html style={{ textAlign: "right", margin: "5%" }}>
          <Subtitle>Con el personal más capacitado</Subtitle>
        </Html>
        <Content left map={img3}>
          <Block factor={-0.5}>{/* <Cross /> */}</Block>
          {/* <Dom prepend style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: "left" }} position={[-contentMaxWidth / 2, -contentMaxWidth / 2 / aspect - 0.4, 1]}>
              Education and enlightenment.
            </Dom> */}
        </Content>
      </Block>
      <Block factor={1.5} offset={4}>
      <Html style={{ textAlign: "center" }}>
          <Subtitle>Contanos tu idea</Subtitle>
        </Html>
      </Block>
    </>
  );
}
