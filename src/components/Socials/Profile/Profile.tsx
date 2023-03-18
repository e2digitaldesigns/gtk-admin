import React from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useParams, useNavigate } from "react-router-dom";
import { AppRoutes, ISocials } from "../../../types";
import httpService from "../../../utils/httpService";

import socialMediaSites from "../../../config/socailMediaConfig.json";

export interface ISocialProfileProps {}

export const SocialProfile: React.FC<ISocialProfileProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = React.useState<ISocials>({
    _id: "",
    site: "",
    username: ""
  });

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}socials/${id}`
      );

      if (stillHere) {
        setState(data);
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, [id]);

  const handleChange = (event: React.ChangeEvent<any>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (!state.username || !state.site) {
      toast.error("Error, Site and username can not be empty");
      return;
    }

    try {
      const { data } = await httpService.put(
        `${process.env.REACT_APP_REST_API}socials/${id}`,
        {
          ...state
        }
      );

      if (!data?.acknowledged) {
        throw new Error();
      }

      toast.success("Booyah!");
    } catch (error) {
      toast.error("Error, Please try again later!");
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const { data } = await httpService.delete(
        `${process.env.REACT_APP_REST_API}socials/${id}`
      );

      if (!data?.acknowledged) {
        throw new Error();
      }

      navigate(AppRoutes.Socials);
    } catch (error) {
      toast.error("Error, Please try again later!");
      console.error(error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Social Network</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Site</Form.Label>

                <Form.Select
                  size="sm"
                  name="site"
                  onChange={handleChange}
                  value={state.site}
                >
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
              <Form.Group className="mb-3">
                <Button variant="primary" type="submit" size="sm">
                  Submit
                </Button>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Button
                  variant="danger"
                  type="button"
                  size="sm"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
