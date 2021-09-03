import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

const Transition = styled.div`
  ${({ animation, time = 2, heightAuto, width, padding }) => `
    width: ${width ? width : `100%`};
    // height: ${heightAuto ? `auto` : `100%`};
    padding: ${padding ? padding : `0px`};
    animation: ${animation && animation} ${time}s;
    
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
`}
`;

const TransitionMounted = ({
  time,
  animation = "fadeIn",
  width,
  padding,
  children,
  onEnd = () => {},
}) => {
  const mounted = useMounted();
  const [end, setEnd] = useState(false);

  return (
    <>
      <Transition
        width={width}
        animation={animation}
        padding={padding}
        transition={mounted}
        time={time}
        onAnimationEnd={() => setEnd(true) }
      >
        {children}
      </Transition>
      {end && onEnd()}
    </>
  );
};

export default TransitionMounted;
