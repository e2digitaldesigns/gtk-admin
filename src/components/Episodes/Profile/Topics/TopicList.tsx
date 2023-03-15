import React from "react";
import { Trash2 } from "react-feather";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import _cloneDeep from "lodash/cloneDeep";
import { IEpisodeTopic, ITemplate } from "../../../../types";
import { sortTopics } from "../../utils/sortTopics";
import * as Styled from "./Topic.style";
import { TopicImageParser } from "../../utils/cloudImageParser";

export interface IEpisodeProfileTopicsProps {
  episodeTopics: IEpisodeTopic[];
  handleActivateTopic: (id: string) => void;
  handleDeleteTopic: (id: string) => void;
  templateState: ITemplate;
}

export const EpisodeProfileTopics: React.FC<IEpisodeProfileTopicsProps> = ({
  episodeTopics,
  handleActivateTopic,
  handleDeleteTopic,
  templateState
}) => {
  return (
    <Col>
      <Card className="mb-3">
        <Card.Header>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
            <div>Topics</div>
            <Badge>{episodeTopics.length}</Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {sortTopics(episodeTopics).map((topic: IEpisodeTopic) => (
              <ListGroup.Item
                key={topic._id}
                onClick={() => handleActivateTopic(topic._id)}
              >
                <Styled.TopicGrid>
                  <Styled.TopicGridImage>
                    <img
                      src={TopicImageParser(topic.img, templateState)}
                      alt="pop"
                    />
                  </Styled.TopicGridImage>
                  <Styled.TopicGridText>
                    <div>
                      {topic.order} | {topic.name}
                    </div>
                    <div>{topic.desc}</div>
                  </Styled.TopicGridText>
                  <Styled.TopicGridIcon>
                    <Trash2 onClick={() => handleDeleteTopic(topic._id)} />
                  </Styled.TopicGridIcon>
                </Styled.TopicGrid>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};
