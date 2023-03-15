import styled from "styled-components";

export const TopicFormGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 1rem;
  > div:first-child {
    width: 100%;
    overflow: hidden;

    img {
      /* width: 100%; */
    }
  }
  > div:last-child {
    width: 100%;
    overflow: hidden;
  }
`;

export const TopicGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr 40px;
  grid-column-gap: 0.5rem;
`;

export const TopicGridImage = styled.div`
  overflow: hidden;
  width: 100%;

  img {
    width: 100%;
    border: 0.125rem solid #444;
    background-color: rgb(231, 241, 255);
  }
`;

export const TopicGridText = styled.div`
  width: 100%;
  > div:first-child {
    width: 100%;
    font-weight: 600;
    font-size: 0.875rem;
    word-wrap: break-word;
    word-break: break-all;
  }
  > div:nth-child(2) {
    width: 100%;
    font-size: 0.75rem;
    word-wrap: break-word;
    word-break: break-all;
  }
`;

export const TopicGridIcon = styled.div`
  display: flex;
  color: black;
  justify-content: right;
  padding-top: 0.25rem;

  > svg {
    width: 1rem;

    :hover {
      color: red;
      cursor: pointer;
    }
  }
`;
