import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ITemplate } from "../../../../types";

interface IProfileTemplateProps {
  template: ITemplate;
  userId: string;
  linkParams: { [key: string]: boolean } | undefined;
}

const ProfileTemplate: React.FC<IProfileTemplateProps> = ({
  template,
  userId,
  linkParams
}) => {
  const { id } = useParams();
  const previewLinkBase = `${process.env.REACT_APP_CLOUD_OVERLAY_BASE}?uid=${userId}&eid=${id}`;

  const openPreview = () => {
    // const linkParameters = Object.keys(linkParams || {})
    //   .map(key => {
    //     return linkParams?.[key] ? `${key}=1` : null;
    //   })
    //   .filter(Boolean)
    //   .join("&");
    // console.log(22, `${previewLinkBase}&${linkParameters}`);
    // window.open(`${previewLinkBase}&${linkParameters}`, "_blank", "noreferrer");
    // return null;
  };

  return (
    <>
      <ButtonGroup size="sm">
        <Button disabled variant="primary">
          Template: {template.name}
        </Button>
        <Button onClick={openPreview} variant="outline-primary">
          Episode Preview
        </Button>
      </ButtonGroup>

      <hr />
    </>
  );
};

export default ProfileTemplate;
