import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
 
import "react-medium-image-zoom/dist/styles.css";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

// import InnerImageZoom from "react-inner-image-zoom";

// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

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
  },
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
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])
  return (
    <Container
      ref={containerRef}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // onMouseMove={handleMouseMove}
    >
      {/* <Zoom> */}
        {/* <Image ref={sourceRef}   style={{width:'auto',borderRadius:'10px', margin:'auto', height:'100%'}}   alt="source" source={img} /> */}
        {/* <InnerImageZoom
          style={{
            width: "auto",
            borderRadius: "10px",
            margin: "auto",
            height: "100%",
          }}
          height={"100%"}
          width={"auto"}
          alt="source"
          hideHint={true}
          zoomSrc={img}
          zoomType="hover"
          zoomPreload={true}
          src={img}
        /> */}
      {/* </Zoom> */}



      {/* <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}> */}
        <Image ref={sourceRef}   style={{width:'auto',borderRadius:'10px', margin:'auto', height:'100%'}}   alt="source" source={img} />
        {/* <InnerImageZoom
          style={{
            width: "auto",
            borderRadius: "10px",
            margin: "auto",
            height: "100%",
          }}
          height={"100%"}
          width={"auto"}
          alt="source"
          hideHint={true}
          zoomSrc={img}
          zoomType="hover"
          zoomPreload={true}
          src={img}
        /> */}
   {/* </ControlledZoom> */}











      {/* <Target
        ref={targetRef}
        alt="target"
          
        opacity={opacity}
        offset={offset}
        source={img}
      /> */}
    </Container>
  );
}
