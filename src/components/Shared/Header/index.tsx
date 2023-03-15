import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "react-feather";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AppRoutes } from "../../../types";
import { Container } from "react-bootstrap";
import useAppData from "./../../../hooks/useAppDataHook/useAppDataHook";

export interface IEpisodeLandingProps {
  description?: string;
  listingLink: AppRoutes;
  newLink?: AppRoutes;
  prefix: string;
  title: string;
}

const ApplicationHeader: React.FC<IEpisodeLandingProps> = ({
  description,
  listingLink,
  newLink,
  prefix,
  title
}) => {
  const { appState, setAppState } = useAppData();
  const navigate = useNavigate();

  const handleOnClick = (link: AppRoutes) => {
    navigate(link);
  };

  const handleSidebarToggle = () => {
    setAppState({
      isSideBarViewable: !appState.isSideBarViewable
    });
  };

  return (
    <>
      <Card
        style={{
          borderLeft: "none",
          borderRight: "none",
          borderRadius: "0",
          marginBottom: "10px"
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Menu onClick={handleSidebarToggle} style={{ width: "18px" }} />
            {title}
          </Card.Title>

          {description && <Card.Text>{description}</Card.Text>}

          {newLink && (
            <Button
              className="me-2 mb-2"
              onClick={() => handleOnClick(newLink)}
              size="sm"
              variant="primary"
            >
              New {prefix}
            </Button>
          )}

          <Button
            className="mb-2"
            onClick={() => handleOnClick(listingLink)}
            size="sm"
            variant="primary"
          >
            {prefix} Listing
          </Button>
        </Card.Body>
      </Card>

      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default ApplicationHeader;
