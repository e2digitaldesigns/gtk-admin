import React from "react";
import { useParams } from "react-router-dom";
import httpService from "../../utils/httpService";

import { defaultEpisodeState, IEpisode } from "../../types";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";

export const ShowRunner: React.FC = () => {
  const { id } = useParams();
  const [episodeState, setEpisodeState] =
    React.useState<IEpisode>(defaultEpisodeState);

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}episodes/${id}`
      );

      const { episode } = data;

      if (stillHere) {
        setEpisodeState({
          ...episode
        });
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const imageParser = (image: string | undefined) => {
  //   if (image) {
  //     return process.env.REACT_APP_CLOUD_IMAGES + image;
  //   }

  //   if (episodeState?.logo) {
  //     return process.env.REACT_APP_CLOUD_IMAGES + episodeState.logo;
  //   }

  //   return "http://placehold.jp/400x220.png";
  // };

  return (
    <>
      <Container>
        <Row>
          <Alert className="mt-4" variant="primary">
            <Alert.Heading>{episodeState.name}</Alert.Heading>

            <hr />
            <p className="mb-0">Date: {episodeState.airDate}</p>
            <p className="mb-0">Episode #{episodeState.number}</p>
            <p className="mb-0">Topics: {episodeState.topics.length}</p>
          </Alert>

          {episodeState.topics?.map((topic, index: number) => (
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>{topic.name}</Card.Title>
                <Card.Text>{topic.desc}</Card.Text>
                {topic.articles && (
                  <Card.Link href={topic.articles}>Article</Card.Link>
                )}
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};
