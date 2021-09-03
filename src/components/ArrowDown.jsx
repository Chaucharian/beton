import React from "react";
import styled from "styled-components";
import { COLORS } from "../consts";

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
`;

const SvgAnimation = styled.div`
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  @keyframes slidein {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const Svg = styled.svg`
  fill: ${COLORS.primary};
  width: 40px;
  height: 40px;
`;

const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
  border: none;
  appearance: none;
  align-items: center;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${COLORS.secondary};
`;

const SvgTween = ({ src, width, height }) => (
//   <Button>
    <SvgAnimation>
      <Svg viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
      </Svg>
    </SvgAnimation>
//   </Button>
);

export default SvgTween;
