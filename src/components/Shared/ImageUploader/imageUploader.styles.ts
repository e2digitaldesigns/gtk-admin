import styled from "styled-components";

interface ImageUploaderProps {
  height?: number | string;
  width?: number | string;
}

export const DropZoneSection = styled.section`
  width: 250px;
  height: 350px;
  background-color: red;
`;

export const ImageWrapper = styled.div<ImageUploaderProps>`
  position: relative;
  width: 250px;
  background-color: blue;
`;

export const ImageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const ImageDeleteDiv = styled.div`
  /* position: absolute; */
  right: 0;
  width: 100px;
  height: 100px;
  background-color: red;
  z-index: 999;
`;
