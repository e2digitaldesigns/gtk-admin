import * as React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../types";
import NoResults from "../../Shared/NoResults";
import httpService from "../../../utils/httpService";

export interface IHostListingProps {}

export const HostListing: React.FC<IHostListingProps> = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState([]);

  const handleGoToProfile = (id: string) => {
    navigate(`${AppRoutes.HostProfileLink}${id}`);
  };

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        process.env.REACT_APP_REST_API + "hosts"
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

  if (!state.length) {
    return <NoResults />;
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Hosts List</Card.Title>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {state.map((item: any) => (
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
