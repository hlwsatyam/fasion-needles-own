 



// import { useRef, useState } from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   position: relative;
//   overflow: hidden;
//   display: block;
//   border-radius: 15px;
//   width: 100%; /* Adjust container width */
//   height: 100%; /* Adjust container height */
// `;

// const Image = styled.img.attrs((props) => ({
//   src: props.source,
// }))`
//   width: 60%;
//   height: 60%;
// `;

// const Target = styled.img.attrs((props) => ({
//   src: props.source,
//   style: {
//     position: "absolute",
//     width: "150%",
//     objectFit: "cover",
//     height: "150%",
//     left: `${props.offset.left}px`,
//     top: `${props.offset.top}px`,
//     opacity: props.opacity,
//     pointerEvents: "none",
//     transition: "opacity 0.2s ease-in-out",
   
//   }
// }))`
//   position: absolute;
//   width: 200%; /* Zoom level */
//   height: 200%; /* Zoom level */
//   left: ${(props) => props.offset.left}px;
//   top: ${(props) => props.offset.top}px;
//   opacity: ${(props) => props.opacity};
//   pointer-events: none; /* Prevent pointer interference */
//   transition: opacity 0.2s ease-in-out;
// `;

// export default function ZoomImgIff({ img }) {
//   const sourceRef = useRef(null);
//   const targetRef = useRef(null);
//   const containerRef = useRef(null);

//   const [opacity, setOpacity] = useState(0);
//   const [offset, setOffset] = useState({ left: 0, top: 0 });

//   const handleMouseEnter = () => {
//     setOpacity(1); // Show zoomed area
//   };

//   const handleMouseLeave = () => {
//     setOpacity(0); // Hide zoomed area
//   };

//   const handleMouseMove = (e) => {
//     const containerRect = containerRef.current.getBoundingClientRect();
//     const targetRect = targetRef.current.getBoundingClientRect();

//     const xRatio = (targetRect.width - containerRect.width) / containerRect.width;
//     const yRatio = (targetRect.height - containerRect.height) / containerRect.height;

//     const left = Math.max(
//       Math.min(e.clientX - containerRect.left, containerRect.width),
//       0
//     );
//     const top = Math.max(
//       Math.min(e.clientY - containerRect.top, containerRect.height),
//       0
//     );

//     setOffset({
//       left: -left * 2*xRatio,
//       top: -top * 2*yRatio,
//     });
//   };

//   return (
//     <Container
//       ref={containerRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseMove={handleMouseMove}
//     >
//       <Image ref={sourceRef}   style={{width:'auto', margin:'auto', height:'100%'}}   alt="source" source={img} />
//       <Target
//         ref={targetRef}
//         alt="target"
          
//         opacity={opacity}
//         offset={offset}
//         source={img}
//       />
//     </Container>
//   );
// }

import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  border-radius: 15px;
  width: 100%;
  height: 100%;
`;

const Image = styled.img.attrs((props) => ({
  src: props.source,
}))`
  width: 60%;
  height: 60%;
  cursor: pointer;
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
  width: 200%;
  height: 200%;
  left: ${(props) => props.offset.left}px;
  top: ${(props) => props.offset.top}px;
  opacity: ${(props) => props.opacity};
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function ZoomImgIff({ img }) {
  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    const xRatio =
      (targetRect.width - containerRect.width) / containerRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / containerRect.height;

    const left = Math.max(
      Math.min(e.clientX - containerRect.left, containerRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.clientY - containerRect.top, containerRect.height),
      0
    );

    setOffset({
      left: -left * 2 * xRatio,
      top: -top * 2 * yRatio,
    });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen]);

  return (
    <>
      <Container
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image
          ref={sourceRef}
          style={{ width: "auto", margin: "auto", height: "100%" }}
          alt="source"
          source={img}
          onClick={handleImageClick}
        />
        <Target
          ref={targetRef}
          alt="target"
          opacity={opacity}
          offset={offset}
          source={img}
        />
      </Container>
      {isModalOpen && (
        <Modal>
          <CloseButton onClick={handleCloseModal}>Close</CloseButton>
          <ModalImage src={img} alt="Full View" />
        </Modal>
      )}
    </>
  );
}
