import styled from "styled-components";

export const ImageListerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;

  * {
    box-sizing: border-box;
  }
`;

export const ImageListerGridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageListerGridItemImage = styled.div`
  width: 100%;
  overflow: hidden;
  border: 0.125rem solid #ddd;
  > img {
    width: 100%;
  }
`;

export const ImageListerGridItemCaption = styled.div``;

export const ImageListerGridItemOptions = styled.div`
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  font-size: 0.8rem;
`;

interface ImageListerDropperProps {
  isDragOver: boolean;
}

export const ImageListerDropper = styled.div<ImageListerDropperProps>`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  font-size: 0.8rem;

  font-weight: ${props => props.isDragOver && "bold"};
  background: ${props => (props.isDragOver ? "#ccc" : "eee")};
`;
