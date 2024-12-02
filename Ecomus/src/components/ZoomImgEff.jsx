 



import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  border-radius: 15px;
  width: 100%; /* Adjust container width */
  height: 100%; /* Adjust container height */
`;

const Image = styled.img.attrs((props) => ({
  src: props.source,
}))`
  width: 60%;
  height: 60%;
`;

const Target = styled.img.attrs((props) => ({
  src: props.source,
  style: {
    position: "absolute",
    width: "150%",
    objectFit: "cover",
    height: "150%",
    left: `${props.offset.left}px`,
    top: `${props.offset.top}px`,
    opacity: props.opacity,
    pointerEvents: "none",
    transition: "opacity 0.2s ease-in-out",
   
  }
}))`
  position: absolute;
  width: 200%; /* Zoom level */
  height: 200%; /* Zoom level */
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  opacity: ${(props) => props.opacity};
  pointer-events: none; /* Prevent pointer interference */
  transition: opacity 0.2s ease-in-out;
`;

export default function ZoomImgIff({ img }) {
  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

 /*  const handleMouseEnter = () => {
    setOpacity(1); // Show zoomed area
  };

  const handleMouseLeave = () => {
    setOpacity(0); // Hide zoomed area
  }; */

  // const handleMouseMove = (e) => {
  //   const containerRect = containerRef.current.getBoundingClientRect();
  //   const targetRect = targetRef.current.getBoundingClientRect();

  //   const xRatio = (targetRect.width - containerRect.width) / containerRect.width;
  //   const yRatio = (targetRect.height - containerRect.height) / containerRect.height;

  //   const left = Math.max(
  //     Math.min(e.clientX - containerRect.left, containerRect.width),
  //     0
  //   );
  //   const top = Math.max(
  //     Math.min(e.clientY - containerRect.top, containerRect.height),
  //     0
  //   );

  //   setOffset({
  //     left: -left * 2*xRatio,
  //     top: -top * 2*yRatio,
  //   });
  // };

  return (
    <Container
      ref={containerRef}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // onMouseMove={handleMouseMove}
    >
      <Image ref={sourceRef}   style={{width:'auto',borderRadius:'10px', margin:'auto', height:'100%'}}   alt="source" source={img} />
      <Target
        ref={targetRef}
        alt="target"
          
        opacity={opacity}
        offset={offset}
        source={img}
      />
    </Container>
  );
}
