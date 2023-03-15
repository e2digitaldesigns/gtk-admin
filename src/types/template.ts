export type TemplateTickerType = "advanced" | "simple";
export type TemplateTopicType = "single" | "multi" | "advanced" | "video";
export interface ILinkArray {
  name: string;
  param: string;
}

export interface ITemplate {
  _id: string;
  name: string;
  maxHosts: number;
  tickerType: TemplateTickerType;
  topicType: TemplateTopicType;
  hasSponsor: boolean;
  hasContentBox: boolean;
  images: ITemplateImages;
  linkArray: ILinkArray[];
}

export interface ITemplateImages {
  contentBox: ITemplateImagesDefault;
  logo: ITemplateImagesDefault;
  sponsors: ITemplateImagesDefault;
  topic: ITemplateImagesDefault;
}

export interface ITemplateImagesDefault {
  amount: number;
  width: number;
  height: number;
}

export const defaultTemplateState: ITemplate = {
  _id: "",
  name: "",
  maxHosts: 1,
  tickerType: "simple",
  topicType: "multi",
  hasSponsor: false,
  hasContentBox: false,
  images: {
    contentBox: { amount: 3, width: 200, height: 200 },
    logo: { amount: 1, width: 200, height: 200 },
    sponsors: { amount: 5, width: 120, height: 10 },
    topic: { amount: 0, width: 0, height: 0 }
  },
  linkArray: []
};

/*
single - one topic
multi - mulitple topics
advanced - nested topics
*/
