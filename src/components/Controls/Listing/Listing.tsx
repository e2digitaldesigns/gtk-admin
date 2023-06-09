import * as React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import { Copy, ExternalLink } from "react-feather";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import * as Styled from "./Listing.style";

export interface IControlListingProps {}

export const ControlListing: React.FC<IControlListingProps> = () => {
  const [userId, setUserId] = React.useState<string>("");

  type ControlLinks = {
    name: string;
    url: string;
  };

  const links: ControlLinks[] = [
    {
      name: "Controls Dock",
      url: `${process.env.REACT_APP_CONTROL_URL}/controlDock/${userId}`
    },
    {
      name: "Chat Dock",
      url: `${process.env.REACT_APP_CONTROL_URL}/chatDock/${userId}`
    }
  ];

  React.useEffect(() => {
    if (process.env.REACT_APP_JWT_TOKEN) {
      const { _id } = jwtDecode(
        localStorage.getItem(process.env.REACT_APP_JWT_TOKEN) || ""
      ) as { _id: string };

      setUserId(_id);
    }
  }, []);

  const handleCopyText = (string: string): void => {
    navigator.clipboard.writeText(string);
    toast.success("The link was copied to the clipboard!");
  };

  const handleLink = (link: string): void => {
    window.open(link, "_blank", "noreferrer");
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title></Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            Use these links to control your podcast overlay.
          </Card.Subtitle>

          {links.map((link, index) => (
            <Card.Text key={index}>
              <Styled.LinkGrid>
                <OverlayTrigger
                  placement={"top"}
                  overlay={<Tooltip id={`tooltip-external`}>View</Tooltip>}
                >
                  <ExternalLink
                    size={16}
                    onClick={() => handleLink(link.url)}
                  />
                </OverlayTrigger>

                <OverlayTrigger
                  placement={"top"}
                  overlay={<Tooltip id={`tooltip-copy`}>Copy</Tooltip>}
                >
                  <Copy size={16} onClick={() => handleCopyText(link.url)} />
                </OverlayTrigger>
                <div> {link.name}</div>
              </Styled.LinkGrid>
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};
