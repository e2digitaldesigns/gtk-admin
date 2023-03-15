import * as React from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../types";
import httpService from "../../../utils/httpService";

export interface IHostNewProps {}

interface IState {
  name: string;
}

export const HostNew: React.FC<IHostNewProps> = () => {
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

    if (!state.name) {
      toast.error("Error, Name can not be empty");
      return;
    }

    try {
      const { data } = await httpService.post(
        `${process.env.REACT_APP_REST_API}hosts`,
        {
          ...state
        }
      );

      if (!data._id) {
        throw new Error();
      }

      navigate(`${AppRoutes.HostProfileLink}${data._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error, Please try again later!");
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>New host</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={handleChange}
                placeholder="Name"
                type="text"
                value={state.name}
              />
              <Form.Text className="text-muted">Name of the Host</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" size="sm">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
