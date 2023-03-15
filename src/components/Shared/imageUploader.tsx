import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { TopicImageParser } from "../Episodes/utils/cloudImageParser";

import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ITemplate } from "../../types";

interface IntImageUploader {
  img: string;
  templateState: ITemplate;
  topicId?: string;
  updateTopicImage: (fileName: string) => void;
}

const ImageUploader: React.FC<IntImageUploader> = ({
  img,
  templateState,
  topicId,
  updateTopicImage
}) => {
  const [progressState, setProgressState] = useState(0);

  const handleFileUploads = async (acceptedFiles: any) => {
    const imageId = uuidv4();
    const formData = new FormData();
    const fileName = `${imageId}.jpg`;

    formData.append("_id", imageId);
    formData.append("fileName", fileName);
    formData.append("imageType", "topic");
    formData.append("file", acceptedFiles[0]);
    formData.append("height", String(templateState.images.topic.height));
    formData.append("width", String(templateState.images.topic.width));

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
          updateTopicImage(data.fileName);
        }
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="order-image-wrapper">
      <div className="drop-zone-wrapper">
        <Dropzone onDrop={acceptedFiles => handleFileUploads(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                style={{ width: templateState.images.topic.height }}
              >
                <input {...getInputProps()} />
                <img
                  className="img-thumbnail"
                  src={TopicImageParser(img, templateState)}
                  alt={img}
                />
                <ProgressBar className="my-2" now={progressState} />

                <div className="d-grid gap-2">
                  <Button variant="primary" type="button" size="sm">
                    Browse Images
                  </Button>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default ImageUploader;
