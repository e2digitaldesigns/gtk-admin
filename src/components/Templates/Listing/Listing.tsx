import * as React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../types";
import { ITemplate } from "../../../types/podcast/template";
import NoResults from "../../Shared/NoResults";
import httpService from "../../../utils/httpService";

export interface ITemplateListingProps {}

export const TemplateListing: React.FC<ITemplateListingProps> = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        process.env.REACT_APP_REST_API + "templates"
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

  const handleGoToProfile = (id: string) => {
    navigate(`${AppRoutes.TemplateProfileLink}${id}`);
  };

  if (!state.length) {
    return <NoResults />;
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Templates</Card.Title>

          <Table striped bordered hover>
            <tbody>
              {state.map((item: ITemplate) => (
                <tr key={item._id} onClick={() => handleGoToProfile(item._id)}>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
