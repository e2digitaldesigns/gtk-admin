import React from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useNavigate } from "react-router-dom";
import { AppRoutes, ISocials } from "../../../types";
import httpService from "../../../utils/httpService";

import socialMediaSites from "../../../config/socailMediaConfig.json";

export interface ISocialNewProps {}

export const SocialNew: React.FC<ISocialNewProps> = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState<Partial<ISocials>>({
    site: socialMediaSites[0],
    username: ""
  });

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!state.username || !state.site) {
      toast.error("Error, Site and username can not be empty");
      return;
    }

    try {
      const { data } = await httpService.post(
        `${process.env.REACT_APP_REST_API}socials`,
        {
          ...state
        }
      );

      if (!data._id) {
        throw new Error();
      }

      navigate(AppRoutes.SocialProfileLink + data._id);
    } catch (error) {
      toast.error("Error, Please try again later!");
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
                <Form.Label>Site</Form.Label>
                <Form.Select size="sm" name="site" onChange={handleChange}>
                  {socialMediaSites.map((site: string) => (
                    <option key={site} value={site}>
                      {site}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col> </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="sm"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  type="text"
                  value={state.username}
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
