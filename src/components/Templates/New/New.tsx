import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../types";

export interface ITemplateNewProps {}

interface IState {
  name: string;
}

export const TemplateNew: React.FC<ITemplateNewProps> = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState<IState>({
    name: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!state.name) return;

    try {
      const { data } = await axios.post(
        "http://localhost:9899/api/v1/templates",
        {
          ...state
        }
      );

      data?._id && navigate(`${AppRoutes.TemplateProfileLink}${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>New Social Network</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="sm"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={state.name}
                />
              </Form.Group>
            </Col>
            <Col> </Col>
          </Row>

          <Row>
            <Col>
              <Button variant="primary" type="submit" size="sm">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
