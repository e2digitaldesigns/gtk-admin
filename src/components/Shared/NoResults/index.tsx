import * as React from "react";
import Card from "react-bootstrap/Card";

const NoResults: React.FC = () => {
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>No Results Found...</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default NoResults;
