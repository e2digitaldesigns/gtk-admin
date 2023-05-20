import React from "react";
import { Trash2 } from "react-feather";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { IEpisodeTopic, ITemplate } from "../../../../types";
import { sortTopics } from "../../utils/sortTopics";
import * as Styled from "./Topic.style";
import { TopicImageParser } from "../../utils/cloudImageParser";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";

export interface IEpisodeProfileTopicsProps {
  episodeTopics: IEpisodeTopic[];
  handleActivateTopic: (id: string) => void;
  handleDeleteTopic: (id: string) => void;
  handleOrderChange: any;
  templateState: ITemplate;
}

export const EpisodeProfileTopics: React.FC<IEpisodeProfileTopicsProps> = ({
  episodeTopics,
  handleActivateTopic,
  handleDeleteTopic,
  handleOrderChange,
  templateState
}) => {
  const dragDropRef = React.useRef<any>(null);

  const topicCount = episodeTopics.length;

  const showAdvancedOptions =
    templateState.topicType === "advanced" ||
    templateState.topicType === "video";

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, _id: string) => {
    e.dataTransfer.setData("id", _id);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, _id: string) => {
    const dragId = e.dataTransfer.getData("id");
    if (dragId === _id) return;

    const newTopics = _cloneDeep(episodeTopics);

    const dragIndex = _findIndex(newTopics, (f: any) => f._id === dragId);
    const dropIndex = _findIndex(newTopics, (f: any) => f._id === _id);

    const dragTopic = newTopics[dragIndex];

    if (dragIndex > dropIndex) {
      newTopics.splice(dragIndex, 1);
      newTopics.splice(dropIndex, 0, dragTopic);
    }

    if (dragIndex < dropIndex) {
      newTopics.splice(dropIndex + 1, 0, dragTopic);
      newTopics.splice(dragIndex, 1);
    }

    handleOrderChange(newTopics);
  };

  return (
    <Col>
      <Card className="mb-3">
        <Card.Header>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
            <div>Topics</div>
            <Badge>{topicCount}</Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {sortTopics(episodeTopics).map((topic: IEpisodeTopic) => (
              <ListGroup.Item
                draggable="true"
                onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDragStart(e, topic._id)
                }
                onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDragDrop(e, topic._id)
                }
                key={topic._id}
                onClick={() => handleActivateTopic(topic._id)}
                ref={dragDropRef}
              >
                <Styled.TopicGrid showImage={showAdvancedOptions}>
                  {showAdvancedOptions && (
                    <Styled.TopicGridImage>
                      <img
                        src={TopicImageParser(
                          topic.img,
                          templateState.images.topic.width,
                          templateState.images.topic.height
                        )}
                        alt="pop"
                      />
                    </Styled.TopicGridImage>
                  )}
                  <Styled.TopicGridText>
                    <div>
                      {topic.order} | {topic.name}
                    </div>
                    <div>{topic.desc}</div>
                  </Styled.TopicGridText>
                  <Styled.TopicGridIcon>
                    {topicCount > 1 && (
                      <Trash2 onClick={() => handleDeleteTopic(topic._id)} />
                    )}
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
