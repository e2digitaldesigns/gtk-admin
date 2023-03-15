import styled from "styled-components";

export const ApplicationWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;

interface IMainContent {
  isSideBarViewable?: boolean;
}

export const MainContent = styled.section<IMainContent>`
  overflow-y: auto;
  width: 100%;
  padding-left: ${props => (props.isSideBarViewable ? "220px" : "0")};
  transition: padding 0.5s;
`;

export const Drawer = styled.section`
  width: 600px;
  height: 100vh;
  position: fixed;
  right: 0;
  background-color: aliceblue;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  display: none;
`;
