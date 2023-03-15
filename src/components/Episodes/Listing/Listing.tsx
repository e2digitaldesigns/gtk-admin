import * as React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import * as Icons from "react-feather";

import { AppRoutes } from "../../../types";
import NoResults from "../../Shared/NoResults";
import httpService from "../../../utils/httpService";

export interface IEpisodeListingProps {}

export const EpisodeListing: React.FC<IEpisodeListingProps> = () => {
  const navigate = useNavigate();

  const [episodes, setEpisodes] = React.useState([]);

  const handleEpisode = (id: string) => {
    navigate(`${AppRoutes.EpisodesProfileLink}${id}`);
  };

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}episodes`
      );

      console.log(data);

      if (stillHere) {
        setEpisodes(data);
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, []);

  if (!episodes.length) {
    return <NoResults />;
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Episode List</Card.Title>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Template</th>
                <th>Current</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {episodes.map((episode: any) => (
                <tr
                  key={episode._id}
                  onClick={() => handleEpisode(episode._id)}
                >
                  <td>{episode.name}</td>
                  <td>{episode?.templateName || "ppp"}</td>
                  <td style={{ textAlign: "center" }}>
                    {episode.current ? <Icons.Check /> : ""}
                  </td>
                  <td>{episode.airDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
