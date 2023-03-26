import { ITemplate } from "../../../types/podcast/template";

export const TopicImageParser = (
  image: string | undefined,
  width: number,
  height: number
) => {
  return image
    ? `${process.env.REACT_APP_CLOUD_IMAGES}${image}`
    : `http://placehold.jp/${width}x${height}.png`;
};
