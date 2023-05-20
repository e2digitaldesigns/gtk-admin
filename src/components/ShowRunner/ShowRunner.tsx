import React from "react";
import { useParams } from "react-router-dom";
import httpService from "../../utils/httpService";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";

import * as Styled from "./ShowRunner.style";

export const ShowRunner: React.FC = () => {
  const { id } = useParams();
  const [episodeState, setEpisodeState] = React.useState<any>({
    airDate: "",
    name: "",
    number: 0,
    topics: []
  });

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}shows/showRunner/${id}`
      );

      console.log(data);

      if (stillHere) {
        setEpisodeState({
          ...data
        });
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageParser = (image: string | undefined) => {
    if (image) {
      return process.env.REACT_APP_CLOUD_IMAGES + image;
    }

    if (episodeState?.logo) {
      return process.env.REACT_APP_CLOUD_IMAGES + episodeState.logo;
    }

    return "http://placehold.jp/400x220.png";
  };

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

          {episodeState.topics?.map((topic: any, index: number) => (
            <Card className="mb-2" key={index}>
              <Card.Body>
                <Styled.TopicGrid>
                  <Styled.ImageWrapper>
                    <img src={imageParser(topic.img)} alt={topic.name} />
                  </Styled.ImageWrapper>
                  <div>
                    <Styled.TopicName>{topic.name}</Styled.TopicName>
                    <Card.Text>{topic.desc}</Card.Text>
                    {topic.articles.trim() && topic.articles && (
                      <Card.Link href={topic.articles}>Article</Card.Link>
                    )}
                  </div>
                </Styled.TopicGrid>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};
