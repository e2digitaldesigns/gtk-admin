import React from "react";
import * as Styled from "./SideBarNav.style";
import { Link } from "react-router-dom";
import * as Icons from "react-feather";
import { AppRoutes } from "../../types";
import useAppData from "./../../hooks/useAppDataHook/useAppDataHook";

interface ISections {
  display: string;
  link: AppRoutes;
  SideBarIcon: Icons.Icon;
  isChild?: boolean;
}

const SideBarNav: React.FC = () => {
  const { appState } = useAppData();

  const sections: ISections[] = [
    // {
    //   display: "DashBoard",
    //   link: AppRoutes.DashBoard,
    //   SideBarIcon: Icons.Activity
    // },
    {
      display: "Podcast Templates",
      link: AppRoutes.Templates,
      SideBarIcon: Icons.Box
    },

    {
      display: "Episodes",
      link: AppRoutes.Episodes,
      SideBarIcon: Icons.Tv,
      isChild: true
    },
    {
      display: "Host",
      link: AppRoutes.Hosts,
      SideBarIcon: Icons.User,
      isChild: true
    },
    {
      display: "Social Networks",
      link: AppRoutes.Socials,
      SideBarIcon: Icons.Twitter,
      isChild: true
    }

    // {
    //   display: "Stand Alones",
    //   link: AppRoutes.Templates,
    //   SideBarIcon: Icons.Sidebar
    // }
  ];

  return (
    <Styled.SidebarNavWrapper isSideBarViewable={appState.isSideBarViewable}>
      <Styled.SidebarNavHeader>OverlayMe</Styled.SidebarNavHeader>

      <Styled.SidebarNavItemDivider>Menu</Styled.SidebarNavItemDivider>

      {sections.map(({ display, link, isChild, SideBarIcon }: ISections) => (
        <Link to={link} key={display}>
          <Styled.SidebarNavItem isChild={isChild}>
            <Styled.SidebarNavItemIcon>
              <SideBarIcon />
            </Styled.SidebarNavItemIcon>
            <Styled.SidebarNavText>{display}</Styled.SidebarNavText>
          </Styled.SidebarNavItem>
        </Link>
      ))}
    </Styled.SidebarNavWrapper>
  );
};

export default SideBarNav;
