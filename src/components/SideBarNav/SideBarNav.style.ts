import styled from "styled-components";

const bgColor = "#0f172a";
const bgColorHover = "#2c3344";
const borderColor = "#3f3f3f";
const fontColor = "#bbb";
const fontColorHover = "white";

interface ISidebarNavWrapper {
  isSideBarViewable?: boolean;
}

export const SidebarNavWrapper = styled.section<ISidebarNavWrapper>`
  position: absolute;
  top: 0;
  left: ${props => (props.isSideBarViewable ? "0" : "-220px")};
  width: 220px;
  height: 100vh;
  overflow-y: auto;
  border-right: 0.0625rem solid #ddd;
  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2);
  background-color: ${bgColor};
  overflow: hidden;
  padding: 0;
  transition: left 0.5s;

  a {
    text-decoration: none;
  }
`;

export const SidebarNavHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  border-bottom: 0.0625rem solid ${borderColor};
  margin-bottom: 2.5rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${fontColor};
`;

interface ISidebarNavItem {
  isChild?: boolean;
}
export const SidebarNavItem = styled.div<ISidebarNavItem>`
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 1fr;
  grid-column-gap: 0.5rem;
  border-bottom: 0.0625rem solid ${borderColor};
  height: 2.5rem;
  transition: all 0.5s;
  padding: 0 0.5rem;
  padding-left: ${props => (props.isChild ? "1.25rem" : "0.5rem")};
  color: ${fontColor};
  :hover {
    background-color: ${bgColorHover};
    color: ${fontColorHover};
  }
`;

export const SidebarNavItemDivider = styled.div`
  color: #82849f;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 800;
  padding: 10px 14px;
`;

export const SidebarNavItemIcon = styled.div`
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
`;

export const SidebarNavText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
`;
