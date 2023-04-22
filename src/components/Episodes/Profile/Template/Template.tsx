import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { ITemplate } from "../../../../types";

interface IProfileTemplateProps {
  template: ITemplate;
}

const ProfileTemplate: React.FC<IProfileTemplateProps> = ({ template }) => {
  return (
    <>
      <ButtonGroup size="sm">
        <Button disabled variant="primary">
          Template: {template.name}
        </Button>
        {/* <Button variant="outline-primary">Episode Preview</Button> */}
      </ButtonGroup>

      <hr />
    </>
  );
};

export default ProfileTemplate;
