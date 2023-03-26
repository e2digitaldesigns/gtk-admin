import React from "react";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import mongoose from "mongoose";

import { useNavigate, useParams } from "react-router-dom";
import { Episodic } from "./Episode/Episode";
import { EpisodeTicker } from "./Ticker/Ticker";
import { v4 as uuidv4 } from "uuid";
import _cloneDeep from "lodash/cloneDeep";
import {
  AccordionKeys,
  AppRoutes,
  defaultEpisodeState,
  defaultEpisodeTopicState,
  defaultTemplateState,
  IEpisode,
  IEpisodeTicker,
  IEpisodeTopic,
  ITemplate
} from "../../../types";
import { EpisodeHosts } from "./Hosts/Hosts";
import _isEqual from "lodash/isEqual";
import _filter from "lodash/filter";
import { EpisodeSocials } from "./Socials/Socials";
import { EpisodeTopics } from "./Topics/Topics";
import { EpisodeProfileTopics } from "./Topics/TopicList";
import httpService from "../../../utils/httpService";
import ProfileTemplate from "./Template/Template";
import EpisodeLinks from "./Links/Links";
import AccordionWrapper from "../utils/AccordionWrapper";
import ImageLister from "./ImageLister/ImageLister";

export interface IEpisodeProfileProps {}

export const EpisodeProfile: React.FC<IEpisodeProfileProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTopicId, setActiveTopicId] = React.useState<string>("");
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const [episodeState, setEpisodeState] =
    React.useState<IEpisode>(defaultEpisodeState);

  const [templateState, setTemplateState] =
    React.useState<ITemplate>(defaultTemplateState);

  const episodeTopicsRef = React.useRef<IEpisodeTopic[]>([]);
  const episodeSponsorImagesRef = React.useRef<string[]>([]);
  const episodeLogoImagesRef = React.useRef<string>(" ");

  React.useEffect(() => {
    const isEqualTopics = _isEqual(
      episodeTopicsRef.current,
      episodeState.topics
    );

    const isEqualSponsors = _isEqual(
      episodeSponsorImagesRef.current,
      episodeState.sponsorImages
    );

    const isEqualLogo = _isEqual(
      episodeLogoImagesRef.current,
      episodeState.logo
    );

    if (isEqualTopics && isEqualSponsors && isEqualLogo) return;
    handleSubmit();

    episodeTopicsRef.current = episodeState.topics;
    episodeSponsorImagesRef.current = episodeState.sponsorImages;
    episodeLogoImagesRef.current = episodeState.logo;
  }, [episodeState.topics, episodeState.sponsorImages]);

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}episodes/${id}`
      );

      const { episode, template } = data;

      if (stillHere) {
        setEpisodeState(episode);
        setTemplateState(template);
        setIsLoaded(true);

        if (episode?.topics?.[0]) {
          setActiveTopicId(episode.topics[0]._id);
        }

        episodeTopicsRef.current = episode.topics;
        episodeSponsorImagesRef.current = episode.sponsorImages;
        episodeLogoImagesRef.current = episode.logo;
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setEpisodeState({
      ...episodeState,
      [name]: value === "true" ? true : value === "false" ? false : value
    });
  };

  const handleChangeTicker = (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ): void => {
    const newState = _cloneDeep(episodeState);
    const index = newState.ticker.findIndex(
      (f: IEpisodeTicker) => f._id === _id
    );

    newState.ticker[index][event.target.name as keyof IEpisodeTicker] =
      event.target.value;
    setEpisodeState(newState);
  };

  const handleAddTicker = (): void => {
    const newState = _cloneDeep(episodeState);
    newState.ticker.push({ _id: uuidv4(), title: "", text: "" });
    setEpisodeState(newState);
  };

  const handleDeleteTicker = (_id: string): void => {
    const newState = _cloneDeep(episodeState);
    newState.ticker = newState.ticker.filter(
      (f: IEpisodeTicker) => f._id !== _id
    );
    setEpisodeState(newState);
  };

  const handleHostSelect = (hostId: string, seatNum: string): void => {
    let hosts = _cloneDeep(episodeState.hosts);

    if (hostId !== "none") {
      hosts = _filter(hosts, f => f.seatNum !== Number(seatNum));
      hosts.push({ seatNum: Number(seatNum), hostId });
    } else {
      hosts = _filter(hosts, f => f.seatNum < Number(seatNum));
    }

    setEpisodeState({ ...episodeState, hosts });
  };

  const handleSocialSelect = (_id: string, order: string): void => {
    let socialNetworks = _cloneDeep(episodeState.socialNetworks);

    if (_id !== "none") {
      socialNetworks = _filter(socialNetworks, f => f.order !== Number(order));
      socialNetworks.push({ order: Number(order), socialId: _id });
    } else {
      socialNetworks = _filter(socialNetworks, f => f.order < Number(order));
    }

    setEpisodeState({ ...episodeState, socialNetworks });
  };

  const handleActivateTopic = (id: string): void => {
    setActiveTopicId(id);
  };

  const handleDeleteTopic = (id: string) => {
    const newState = _cloneDeep(episodeState);
    newState.topics = newState.topics.filter(
      (topicSt: IEpisodeTopic) => topicSt._id !== id
    );

    setEpisodeState(newState);
  };

  const handleTopicSubmit = (topic: IEpisodeTopic) => {
    const newState = _cloneDeep(episodeState);
    const index = newState.topics.findIndex(
      (topicSt: IEpisodeTopic) => topicSt._id === topic._id
    );

    newState.topics[index] = topic;
    setEpisodeState(newState);
  };

  const handleCreateNewTopic = () => {
    const newState = _cloneDeep(episodeState);
    const _id = String(new mongoose.Types.ObjectId());

    newState.topics.push({
      ...defaultEpisodeTopicState,
      _id,
      order: newState.topics.length + 1
    });

    setEpisodeState(newState);
    setActiveTopicId(_id);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const { data } = await httpService.put(
        `${process.env.REACT_APP_REST_API}episodes/${id}`,
        {
          ...episodeState
        }
      );

      if (!data?.acknowledged) {
        throw new Error();
      } else {
        toast.success("Episode updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEpisode = async (): Promise<void> => {
    try {
      const { data } = await httpService.delete(
        `${process.env.REACT_APP_REST_API}episodes/${id}`
      );

      if (!data?.acknowledged || !data.deletedCount) {
        throw new Error();
      }

      navigate(AppRoutes.Episodes);
    } catch (error) {
      console.error(error);
      toast.error("Error, Please try again later!");
    }
  };

  const updateStateImage = (
    imageType: "logo" | "sponsors",
    image: string,
    arrayAction: "add" | "remove" = "add"
  ): void => {
    const newState = _cloneDeep(episodeState);

    if (arrayAction === "add") {
      imageType === "sponsors"
        ? newState.sponsorImages.push(image)
        : (newState.logo = image);
    } else if (arrayAction === "remove") {
      imageType === "sponsors"
        ? newState.sponsorImages.splice(
            newState.sponsorImages.indexOf(image),
            1
          )
        : (newState.logo = "");
    }
    setEpisodeState(newState);
  };

  const isSingleTopic = templateState.topicType === "single";

  return (
    <Row>
      <Col lg={isSingleTopic ? 12 : 7}>
        <Card className="mb-3">
          <Card.Body>
            <ProfileTemplate
              template={templateState}
              userId={episodeState.userId}
            />

            <Accordion defaultActiveKey={[AccordionKeys.Topics]} alwaysOpen>
              <AccordionWrapper
                eventKey={AccordionKeys.Episode}
                header="Episode Information"
              >
                <Episodic
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  state={episodeState}
                />
              </AccordionWrapper>

              <AccordionWrapper
                eventKey={AccordionKeys.Topics}
                header={`Topics (${episodeState.topics.length})`}
              >
                {episodeState.topics.length > 0 ? (
                  <EpisodeTopics
                    activeTopicId={activeTopicId}
                    episodeTopicState={episodeState.topics}
                    handleCreateNewTopic={handleCreateNewTopic}
                    handleTopicSubmit={handleTopicSubmit}
                    templateState={templateState}
                  />
                ) : (
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
              </AccordionWrapper>

              {templateState.maxHosts > 0 && (
                <AccordionWrapper
                  eventKey={AccordionKeys.Hosts}
                  header={`Hosts (${episodeState.hosts.length} / ${templateState.maxHosts})`}
                >
                  <EpisodeHosts
                    handleHostSelect={handleHostSelect}
                    handleSubmit={handleSubmit}
                    episodeHostsState={episodeState.hosts}
                    maxHosts={templateState.maxHosts}
                  />
                </AccordionWrapper>
              )}

              <AccordionWrapper
                eventKey={AccordionKeys.Ticker}
                header={`News Ticker / Scroller (${episodeState.ticker.length})`}
              >
                {" "}
                <EpisodeTicker
                  handleAddTicker={handleAddTicker}
                  handleChangeTicker={handleChangeTicker}
                  handleDeleteTicker={handleDeleteTicker}
                  handleSubmit={handleSubmit}
                  tickerState={episodeState.ticker}
                  tickerType={templateState.tickerType}
                />
              </AccordionWrapper>

              <AccordionWrapper
                eventKey={AccordionKeys.Socials}
                header="Social Networks"
              >
                <EpisodeSocials
                  handleSocialSelect={handleSocialSelect}
                  handleSubmit={handleSubmit}
                  episodeSocialsState={episodeState.socialNetworks}
                />
              </AccordionWrapper>

              {templateState.images?.logo?.amount > 0 && (
                <AccordionWrapper
                  eventKey={AccordionKeys.Logo}
                  header={`Logo ${templateState.images?.logo?.width}x${templateState.images?.logo?.height}`}
                >
                  <ImageLister
                    amount={templateState.images?.logo?.amount}
                    height={templateState.images?.logo?.height}
                    imageType="logo"
                    width={templateState.images?.logo?.width}
                    updateStateImage={updateStateImage}
                    images={episodeState.logo}
                  />
                </AccordionWrapper>
              )}

              {templateState.images?.sponsors?.amount > 0 && (
                <AccordionWrapper
                  eventKey={AccordionKeys.Sponsors}
                  header={`Sponsor Images ${
                    templateState.images?.sponsors?.width
                  }x${templateState.images?.sponsors?.height} (${
                    episodeState?.sponsorImages?.length || 0
                  })`}
                >
                  <ImageLister
                    amount={templateState.images?.sponsors?.amount}
                    height={templateState.images?.sponsors?.height}
                    imageType="sponsors"
                    width={templateState.images?.sponsors?.width}
                    updateStateImage={updateStateImage}
                    images={episodeState.sponsorImages}
                  />
                </AccordionWrapper>
              )}

              {templateState.linkArray.length > 0 && (
                <AccordionWrapper
                  eventKey={AccordionKeys.Links}
                  header="Browser Links"
                >
                  <EpisodeLinks template={templateState} />
                </AccordionWrapper>
              )}

              <AccordionWrapper
                eventKey={AccordionKeys.Delete}
                header="Delete Episode"
              >
                {" "}
                <Button onClick={handleDeleteEpisode} variant="danger">
                  Delete this Episode
                </Button>
              </AccordionWrapper>
            </Accordion>
          </Card.Body>
        </Card>
      </Col>

      {templateState.topicType !== "single" && (
        <EpisodeProfileTopics
          episodeTopics={episodeState.topics}
          handleActivateTopic={handleActivateTopic}
          handleDeleteTopic={handleDeleteTopic}
          templateState={templateState}
        />
      )}
    </Row>
  );
};
