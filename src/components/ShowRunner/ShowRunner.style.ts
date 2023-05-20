import styled from "styled-components";

export const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 4px;
  justify-content: center;
  align-items: center;
`;

export const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 8px;
`;

export const ImageWrapper = styled.div`
  img {
    width: 100%;
    border: 1px solid black;
  }
`;

export const TopicName = styled.h6`
  margin-bottom: 0px;
`;
