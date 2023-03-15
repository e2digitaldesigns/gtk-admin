import * as React from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../types";
import httpService from "../../../utils/httpService";

export interface IEpisodeNewProps {}

interface IState {
  name: string;
  templateId: string;
}

export const EpisodeNew: React.FC<IEpisodeNewProps> = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = React.useState([]);

  const [state, setState] = React.useState<IState>({
    name: "",
    templateId: ""
  });

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}templates`
      );

      if (stillHere) {
        setTemplates(data);
        setState({ ...state, templateId: data?.[0]?._id || "" });
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, []);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | any
  ) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!state.name || !state.templateId) {
      toast.error("Error, Name and Template can not be empty");
      return;
    }

    try {
      const { data } = await httpService.post(
        `${process.env.REACT_APP_REST_API}episodes`,
        { ...state }
      );

      data?._id && navigate(`${AppRoutes.EpisodesProfileLink}${data._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error, Please try again later!");
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>New Episode</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Episode Name</Form.Label>
              <Form.Control
                name="name"
                onChange={handleChange}
                placeholder="Episode Name"
                type="text"
                value={state.name}
              />
              <Form.Text className="text-muted">Name of the Episode.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Template</Form.Label>
              <Form.Select
                name="templateId"
                onChange={handleChange}
                value={state.templateId}
              >
                {templates.map((template: any) => (
                  <option key={template._id} value={template._id}>
                    {template.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" size="sm">
              Submit
            </Button>
          </Form>{" "}
        </Card.Body>
      </Card>
    </>
  );
};
