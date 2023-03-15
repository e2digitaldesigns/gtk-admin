import * as React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { AppRoutes, ISocials } from "../../../types";
import httpService from "../../../utils/httpService";
import NoResults from "../../Shared/NoResults";

export interface ISocialListingProps {}

export const SocialListing: React.FC<ISocialListingProps> = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState<ISocials[]>([]);

  const handleGoToProfile = (id: string): void => {
    navigate(`${AppRoutes.SocialProfileLink}${id}`);
  };

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        process.env.REACT_APP_REST_API + "socials"
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
          <Card.Title>Social Networks</Card.Title>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Site</th>
                <th>Username</th>
              </tr>
            </thead>

            <tbody>
              {state.map((item: ISocials) => (
                <tr key={item._id} onClick={() => handleGoToProfile(item._id)}>
                  <td>{item.site}</td>
                  <td>{item.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
