import styled from "styled-components";

export const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-column-gap: 6px;
  justify-content: center;
  align-items: center;
  > svg {
    cursor: pointer;
  }
  > div {
    word-break: break-all;
  }
`;

export const WrapperGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperGridItem = styled.div`
  background-color: rgb(231, 241, 255);
  padding: 12px;
  border-bottom: 1px solid darkblue;

  font-size: 0.875rem;
`;
