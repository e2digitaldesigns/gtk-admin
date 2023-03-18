import * as React from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { IEpisode } from "../../../../types";

interface IEpisodic {
  state: IEpisode;
  handleChange: (event: any) => void;
  handleSubmit: () => Promise<void>;
}

export const Episodic: React.FC<IEpisodic> = ({
  handleChange,
  handleSubmit,
  state
}) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Episode Name</Form.Label>
              <Form.Control
                size="sm"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                type="text"
                value={state.name}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Episode Number</Form.Label>
              <Form.Control
                size="sm"
                name="number"
                onChange={handleChange}
                placeholder="28"
                type="number"
                value={state.number}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Episode Date</Form.Label>
              <Form.Control
                size="sm"
                name="airDate"
                onChange={handleChange}
                type="date"
                value={state.airDate}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Current</Form.Label>
              <Form.Select
                size="sm"
                name="current"
                onChange={handleChange}
                placeholder="Name"
                value={state.current ? "true" : "false"}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Alert variant="info">
              If "Current" is set to "True" this Episode will appear in your
              streaming software.
            </Alert>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Button
              className="me-2"
              variant="primary"
              type="button"
              size="sm"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
