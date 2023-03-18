import { ITemplate } from "../../../types/podcast/template";

export const TopicImageParser = (
  image: string | undefined,
  template: ITemplate
) => {
  return image
    ? `${process.env.REACT_APP_CLOUD_IMAGES}${image}`
    : `http://placehold.jp/${template.images.topic.width}x${template.images.topic.height}.png`;
};
