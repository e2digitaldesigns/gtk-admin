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
  articles: string;
  video: string;
}

export interface IEpisode {
  _id: string;
  active: boolean;
  airDate: string;
  articles: string[];
  contentBoxes: any[];
  current: any;
  hosts: IEpisodeHost[];
  logo: string;
  name: string;
  number: string | number;
  socialNetworks: IEpisodeSocials[];
  sponsorBoxes: any[];
  sponsorImages: string[];
  templateId: string;
  ticker: IEpisodeTicker[];
  topics: IEpisodeTopic[];
  userId: string;
}

export const defaultEpisodeState: IEpisode = {
  _id: "",
  active: false,
  airDate: "",
  articles: [],
  contentBoxes: [],
  current: false,
  hosts: [],
  logo: " ",
  name: "",
  number: "1",
  socialNetworks: [],
  sponsorBoxes: [],
  sponsorImages: [],
  templateId: "",
  ticker: [],
  topics: [],
  userId: ""
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
  img: "",
  articles: "",
  video: ""
};

export enum AccordionKeys {
  Delete = "Delete",
  Episode = "Episode",
  Hosts = "Host",
  Logo = "Logo",
  Links = "Links",
  Ticker = "Ticker",
  ShowRunner = "ShowRunner",
  Socials = "Socials",
  Sponsors = "Sponsors",
  Topics = "Topics"
}
