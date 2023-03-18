import React from "react";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import httpService from "../../../utils/httpService";
import { useParams, useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";

import _cloneDeep from "lodash/cloneDeep";

import { v4 as uuidv4 } from "uuid";
import { AppRoutes } from "../../../types";

interface ISocials {
  _id: string;
  site: string;
  username: string;
}

interface IHostProps {
  _id: string;
  name: string;
  socials: ISocials[];
}

export interface IHostProfileProps {}

export const HostProfile: React.FC<IHostProfileProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = React.useState<IHostProps>({
    _id: "",
    name: "",
    socials: []
  });

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}hosts/${id}`
      );

      if (stillHere) {
        setState(data);
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!state.name) {
      toast.error("Error, Name can not be empty");
      return;
    }

    const newState = _cloneDeep(state);
    newState.socials = newState.socials.filter(
      f => f.site !== "" && f.username !== ""
    );
    setState(newState);

    try {
      const { data } = await httpService.put(
        `${process.env.REACT_APP_REST_API}hosts/${id}`,
        {
          ...newState
        }
      );

      if (!data?.acknowledged) {
        throw new Error();
      }

      toast.success("Booyah!");
    } catch (error) {
      console.error(error);
      toast.error("Error, Please try again later!");
    }
  };

  const handleChangeSocial = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newState = _cloneDeep(state);

    newState.socials[index][event.target.name as keyof ISocials] =
      event.target.value;
    setState(newState);
  };

  const handleAddSocialNetwork = (): void => {
    const newState = _cloneDeep(state);
    newState.socials.push({ _id: uuidv4(), site: "", username: "" });
    setState(newState);
  };

  const handleDeleteSocialNetwork = (_id: string): void => {
    const newState = _cloneDeep(state);
    newState.socials = newState.socials.filter((f: ISocials) => f._id !== _id);
    setState(newState);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await httpService.delete(
        `${process.env.REACT_APP_REST_API}hosts/${id}`
      );

      if (!data?.acknowledged) {
        throw new Error();
      }

      navigate(AppRoutes.Hosts);
    } catch (error) {
      toast.error("Error, Please try again later!");
      console.error(error);
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Host</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Host Name</Form.Label>
                  <Form.Control
                    size="sm"
                    name="name"
                    onChange={handleChange}
                    placeholder="la la la"
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

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Social Networks</Card.Title>
          {state.socials.map((social, index) => (
            <Row key={index}>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    size="sm"
                    name="site"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeSocial(e, index)
                    }
                    type="text"
                    value={social.site}
                  />
                  <Form.Control
                    size="sm"
                    name="username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeSocial(e, index)
                    }
                    type="text"
                    value={social.username}
                  />

                  <Button
                    variant="danger"
                    type="button"
                    size="sm"
                    onClick={() => handleDeleteSocialNetwork(social._id)}
                  >
                    Delete Social Network
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          ))}

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

              <Button
                variant="secondary"
                type="button"
                size="sm"
                onClick={handleAddSocialNetwork}
              >
                New Social
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col>
              <Button
                variant="danger"
                type="button"
                size="sm"
                onClick={handleDelete}
              >
                Delete Host
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
