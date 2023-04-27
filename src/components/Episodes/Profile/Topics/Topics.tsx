import * as React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IEpisodeTopic, ITemplate } from "../../../../types";

import * as Styled from "./Topic.style";

import _map from "lodash/map";
import _filter from "lodash/filter";
import _range from "lodash/range";
import ImageUploader from "../../../Shared/ImageUploader/imageUploader";
import httpService from "../../../../utils/httpService";

interface ITopicProps {
  activeTopicId: string;
  episodeTopicState: IEpisodeTopic[];
  handleCreateNewTopic: () => void;
  handleTopicSubmit: (topic: IEpisodeTopic) => void;
  templateState: ITemplate;
}

export const EpisodeTopics: React.FC<ITopicProps> = ({
  activeTopicId,
  episodeTopicState,
  handleCreateNewTopic,
  handleTopicSubmit,
  templateState
}) => {
  const [activeTopic, setActiveTopic] = React.useState<
    IEpisodeTopic | undefined
  >(undefined);

  React.useMemo(() => {
    const episode = episodeTopicState.find(
      (topic: IEpisodeTopic) => topic._id === activeTopicId
    );

    setActiveTopic(episode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopicId]);

  React.useEffect(() => {
    let stillHere = true;

    if (activeTopic?.isParent && stillHere) {
      setActiveTopic({
        ...activeTopic,
        isChild: false,
        parentId: ""
      });
    }

    if (activeTopic?.isChild && stillHere) {
      setActiveTopic({
        ...activeTopic,
        isParent: false
      });
    }

    return () => {
      stillHere = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic?.isParent, activeTopic?.isChild]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ): void => {
    event.preventDefault();
    const { name, value } = event.target;

    activeTopic &&
      setActiveTopic({
        ...activeTopic,
        [name]: value === "true" ? true : value === "false" ? false : value
      });
  };

  const handleSubmit = () => {
    activeTopic && handleTopicSubmit(activeTopic);
  };

  const handleUpdateTopicImage = async (fileName: string): Promise<void> => {
    if (!activeTopic) return;

    if (activeTopic?.img) {
      try {
        const { data } = await httpService.delete(
          `${process.env.REACT_APP_REST_API}upload/${activeTopic.img}`
        );

        if (!data?.success) {
          throw new Error();
        } else {
          // toast.success("Episode updated successfully!");
        }
      } catch (error) {
        console.error(error);
      }
    }

    setActiveTopic({
      ...activeTopic,
      img: fileName
    });
  };

  React.useEffect(() => {
    activeTopic && handleTopicSubmit(activeTopic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic?.img]);

  const handleDeleteTopicImage = async (): Promise<void> => {
    if (!activeTopic) return;

    try {
      const { data } = await httpService.delete(
        `${process.env.REACT_APP_REST_API}upload/${activeTopic.img}`
      );

      if (!data?.success) {
        throw new Error();
      } else {
        // toast.success("Episode updated successfully!");

        setActiveTopic({
          ...activeTopic,
          img: ""
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showAdvancedOptions =
    templateState.topicType === "advanced" ||
    templateState.topicType === "video";

  const isMultiTopic =
    templateState.topicType === "multi" || showAdvancedOptions;

  if (!activeTopic) return null;

  return (
    <>
      <Styled.TopicFormGrid>
        {showAdvancedOptions && (
          <ImageUploader
            img={activeTopic.img}
            templateState={templateState}
            topicId={activeTopic._id}
            updateTopicImage={handleUpdateTopicImage}
            handleDeleteTopicImage={handleDeleteTopicImage}
          />
        )}

        <div>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="sm"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={activeTopic.name}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {isMultiTopic && (
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Order</Form.Label>

                  <Form.Select
                    name="order"
                    onChange={handleChange}
                    size="sm"
                    value={activeTopic.order}
                  >
                    {activeTopic.order === 0 && (
                      <option value={0}>Choose</option>
                    )}

                    {_range(1, episodeTopicState.length + 1).map(number => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            {templateState.topicType === "advanced" && (
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    size="sm"
                    name="timer"
                    onChange={handleChange}
                    type="number"
                    value={activeTopic.timer}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
        </div>
      </Styled.TopicFormGrid>

      <Row className="mt-3">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Topic Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              size="sm"
              name="desc"
              onChange={handleChange}
              value={activeTopic.desc}
            />
          </Form.Group>
        </Col>
      </Row>

      {showAdvancedOptions && (
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Is Parent</Form.Label>
              <Form.Select
                disabled={activeTopic.isChild}
                name="isParent"
                onChange={handleChange}
                size="sm"
                value={activeTopic.isParent ? "true" : "false"}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Is Child</Form.Label>
              <Form.Select
                disabled={activeTopic.isParent}
                name="isChild"
                onChange={handleChange}
                size="sm"
                value={activeTopic.isChild ? "true" : "false"}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Parent</Form.Label>
              <Form.Select
                disabled={activeTopic.isParent}
                name="parentId"
                onChange={handleChange}
                size="sm"
                value={activeTopic?.parentId || ""}
              >
                <option value="">Choose...</option>
                {_map(
                  _filter(
                    episodeTopicState,
                    (topic: IEpisodeTopic) => topic.isParent === true
                  ),
                  (parent: IEpisodeTopic) => (
                    <option key={parent._id} value={parent._id}>
                      {parent.name}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Button
            className="me-2"
            variant="primary"
            type="button"
            size="sm"
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {isMultiTopic && (
            <Button
              className="me-2"
              variant="secondary"
              type="button"
              size="sm"
              onClick={handleCreateNewTopic}
            >
              New Topic
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};
