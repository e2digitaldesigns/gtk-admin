import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ITemplate } from "../../../../types";

interface IProfileTemplateProps {
  template: ITemplate;
  userId: string;
}

const ProfileTemplate: React.FC<IProfileTemplateProps> = ({
  template,
  userId
}) => {
  const { id } = useParams();
  const previewLink = `${process.env.REACT_APP_CLOUD_OVERLAY_BASE}?uid=${userId}&eid=${id}`;

  const openPreview = () => {
    window.open(previewLink, "_blank", "noreferrer");
    return null;
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
        {/* <Button variant="outline-primary">GTK Sample Episode</Button>
        <Button variant="outline-primary">Browser Link Compiler</Button> */}
      </ButtonGroup>

      <hr />
    </>
  );
};

export default ProfileTemplate;
