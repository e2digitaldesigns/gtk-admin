import React from "react";
import { v4 as uuidv4 } from "uuid";
import Dropzone from "react-dropzone";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { TopicImageParser } from "../../../Episodes/utils/cloudImageParser";

import * as Styled from "./ImageLister.style";
import httpService from "../../../../utils/httpService";

interface IImageListerProps {
  amount: number;
  height: number;
  images: string[] | string;
  imageType: "logo" | "sponsors";
  width: number;
  updateStateImage: (
    imageType: "logo" | "sponsors",
    fileName: string,
    arrayAction?: "add" | "remove"
  ) => void;
}

const ImageLister: React.FC<IImageListerProps> = ({
  height,
  width,
  images,
  imageType,
  updateStateImage
}) => {
  const [progressState, setProgressState] = React.useState(0);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);

  const handleDeleteTopicImage = async (image: string): Promise<void> => {
    try {
      const { data } = await httpService.delete(
        `${process.env.REACT_APP_REST_API}upload/${image}`
      );

      if (!data?.success) {
        throw new Error();
      } else {
        updateStateImage(imageType, image, "remove");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUploads = async (acceptedFiles: any) => {
    const imageId = uuidv4();
    const formData = new FormData();
    const fileName = `${imageId}.jpg`;

    formData.append("_id", imageId);
    formData.append("fileName", fileName);
    formData.append("imageType", imageType);
    formData.append("file", acceptedFiles[0]);
    formData.append("height", String(height));
    formData.append("width", String(width));

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${process.env.REACT_APP_REST_API}upload`, true);

    xhr.upload.addEventListener("progress", e => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      setProgressState(percent);
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.response);
        setProgressState(0);

        if (data.success === 1) {
          updateStateImage(imageType, data.fileName);
        }
      }
    };

    xhr.send(formData);
  };

  const imageArray = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <>
      <Styled.ImageListerGrid>
        {imageArray &&
          imageArray.map(item => (
            <Styled.ImageListerGridItem key={item}>
              <Styled.ImageListerGridItemImage>
                <img
                  // className="img-thumbnail"
                  src={TopicImageParser(item, width, height)}
                  alt={item}
                />
              </Styled.ImageListerGridItemImage>

              <Styled.ImageListerGridItemOptions
                onClick={() => handleDeleteTopicImage(item)}
              >
                Delete
              </Styled.ImageListerGridItemOptions>
            </Styled.ImageListerGridItem>
          ))}
      </Styled.ImageListerGrid>

      <hr />

      <Dropzone onDrop={acceptedFiles => handleFileUploads(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ width: "100%" }}>
            <input {...getInputProps()} />

            <Styled.ImageListerDropper
              isDragOver={isDragOver}
              onDragOver={() => setIsDragOver(true)}
              onDragLeave={() => setIsDragOver(false)}
            >
              Drag & drop files here!
            </Styled.ImageListerDropper>

            <ProgressBar className="my-2" now={progressState} />

            <div className="d-grid gap-2">
              <Button variant="primary" type="button" size="sm">
                Browse Images
              </Button>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default ImageLister;
