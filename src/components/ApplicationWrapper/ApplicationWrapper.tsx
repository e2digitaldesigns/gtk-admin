import React from "react";
import { Outlet } from "react-router";
import SideBarNav from "../SideBarNav/SideBarNav";
import * as Styled from "./ApplicationWrapper.style";
import useAppData from "./../../hooks/useAppDataHook/useAppDataHook";

const ApplicationWrapper: React.FC = () => {
  const { appState } = useAppData();

  return (
    <>
      {/* <Styled.Drawer>drawer</Styled.Drawer> */}
      <Styled.ApplicationWrapper>
        <SideBarNav />

        <Styled.MainContent isSideBarViewable={appState.isSideBarViewable}>
          <Outlet />
        </Styled.MainContent>
      </Styled.ApplicationWrapper>
    </>
  );
};

export default ApplicationWrapper;
