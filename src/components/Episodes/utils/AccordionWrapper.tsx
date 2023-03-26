import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { AccordionKeys } from "../../../types";

export interface IAccordionWrapperProps {
  children: React.ReactNode;
  eventKey: AccordionKeys;
  header: string;
}

const AccordionWrapper: React.FC<IAccordionWrapperProps> = ({
  children,
  eventKey,
  header
}) => {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>{children}</Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionWrapper;
