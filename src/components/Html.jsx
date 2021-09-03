import React from "react";
import { useThree } from "@react-three/fiber";
import { Html as HTML } from "@react-three/drei";
import { usePortal } from "./Main";

export function Html({ className, style, children, portal: parentPortal, props }) {
  const { size } = useThree();
  const contextPortal = usePortal();
  const portal = parentPortal === undefined ? contextPortal : parentPortal;

  if (!parentPortal && !contextPortal) {
    throw new Error("You have to provide a portal either by context or prop");
  }

  return (
    <HTML
      portal={portal}
      style={{
        position: "absolute",
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height,
      }}
    >
      <div className={className} style={{...style}}>
        {children}
      </div>
    </HTML>
  );
}
