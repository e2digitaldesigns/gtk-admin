export interface IEpisodeTicker {
  _id: string;
  title: string;
  text: string;
}

export interface IEpisodeHost {
  hostId: string;
  seatNum: number;
}

export interface IEpisodeSocials {
  socialId: string;
  order: number;
}

export interface IEpisodeTopic {
  _id: string;
  desc: string;
  img: string;
  isChild: boolean;
  isParent: boolean;
  name: string;
  order: number;
  parentId: string | null;
  timer: number;
}

export interface IEpisode {
  _id: string;
  name: string;
  active: boolean;
  airDate: string;
  current: any;
  hosts: IEpisodeHost[];
  number: string | number;
  socialNetworks: IEpisodeSocials[];
  templateId: string;
  ticker: IEpisodeTicker[];
  topics: IEpisodeTopic[];
  userId: string;
  contentBoxes: any[];
  sponsorBoxes: any[];
  logo: string;
  sponsorImages: string[];
}

export const defaultEpisodeState: IEpisode = {
  _id: "",
  name: "",
  active: false,
  airDate: "",
  current: false,
  hosts: [],
  number: "1",
  socialNetworks: [],
  templateId: "",
  ticker: [],
  topics: [],
  userId: "",
  contentBoxes: [],
  sponsorBoxes: [],
  sponsorImages: [],
  logo: " "
};

export const defaultEpisodeTopicState: IEpisodeTopic = {
  _id: "",
  order: 1,
  name: "New Topic",
  desc: "",
  timer: 0,
  isParent: false,
  isChild: false,
  parentId: null,
  img: ""
};

export enum AccordionKeys {
  Delete = "Delete",
  Episode = "Episode",
  Hosts = "Host",
  Logo = "Logo",
  Links = "Links",
  Ticker = "Ticker",
  Socials = "Socials",
  Sponsors = "Sponsors",
  Topics = "Topics"
}
