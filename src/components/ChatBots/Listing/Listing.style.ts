import styled from "styled-components";

export const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
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
