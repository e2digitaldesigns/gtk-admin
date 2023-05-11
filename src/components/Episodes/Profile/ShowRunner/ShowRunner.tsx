import React from "react";
import { useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { Copy } from "react-feather";

export const ShowRunner: React.FC = () => {
  const { id } = useParams();
  const LINK = `${process.env.REACT_APP_GTK_URL}/public/show-runner/${id}`;

  const handleCopyText = (string: string): void => {
    navigator.clipboard.writeText(string);
    toast.success("The link was copied to the clipboard!");
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Show Runner</Card.Title>
        <Card.Title style={{ fontSize: "14px" }}>
          <Copy size={16} onClick={() => handleCopyText(LINK)} /> {LINK}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};
