import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Copy, ExternalLink } from "react-feather";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

import * as Styled from "./Links.style";
import { ILinkArray, ITemplate } from "../../../../types";
import { Button, ButtonGroup } from "react-bootstrap";

interface IEpisodeLinksProps {
  template: ITemplate;
}

const EpisodeLinks: React.FC<IEpisodeLinksProps> = ({ template }) => {
  const [userId, setUserId] = React.useState<string>("");
  const LINK = `${process.env.REACT_APP_CLOUD_OVERLAY_URL}${template._id}&uid=${userId}`;

  const [linkParams, setLinkParams] = React.useState<{
    [key: string]: boolean;
  }>();

  React.useEffect(() => {
    const obj = {} as { [key: string]: boolean };
    template.linkArray.forEach((item: ILinkArray) => {
      obj[item.param] = false;
    });

    setLinkParams(obj);
  }, []);

  const isButtonEnabled =
    linkParams && !Object.values(linkParams).some(value => value);

  const { id } = useParams();

  const openPreview = (type: "episode" | "current") => {
    const previewLinkBaseEpisode = `${process.env.REACT_APP_CLOUD_OVERLAY_BASE}?uid=${userId}&eid=${id}`;
    const previewLinkBaseCurrent = `${process.env.REACT_APP_CLOUD_OVERLAY_BASE}?uid=${userId}&tid=${template._id}`;

    const previewLinkBase =
      type === "current" ? previewLinkBaseCurrent : previewLinkBaseEpisode;

    const linkParameters = Object.keys(linkParams || {})
      .map(key => {
        return linkParams?.[key] ? `${key}=1` : null;
      })
      .filter(Boolean)
      .join("&");

    if (type === "episode") {
      window.open(
        `${previewLinkBase}&${linkParameters}`,
        "_blank",
        "noreferrer"
      );
      return null;
    } else {
      return `${previewLinkBase}&${linkParameters}`;
    }
  };

  React.useEffect(() => {
    if (process.env.REACT_APP_JWT_TOKEN) {
      const { _id } = jwtDecode(
        localStorage.getItem(process.env.REACT_APP_JWT_TOKEN) || ""
      ) as { _id: string };
      setUserId(_id);
    }
  }, []);

  const linkParser = (layer: string): string => {
    return layer ? `${LINK}&${layer}=1` : `${LINK}`;
  };

  const handleCopyText = (string: string): void => {
    navigator.clipboard.writeText(string);
    toast.success("The link was copied to the clipboard!");
  };

  const handleCheckbox = (checked: boolean, param: string): void => {
    setLinkParams({ ...linkParams, [param]: checked });
  };

  const copyCurrentEpisodePreviewLink = (): void => {
    const link = openPreview("current");
    if (link) {
      handleCopyText(link);
    } else {
      toast.error("There was an error copying the link!");
    }
  };

  const handleLink = (link: string): void => {
    window.open(link, "_blank", "noreferrer");
  };

  if (template?.linkArray.length === 0) {
    template?.linkArray.push({ param: "", name: "Full Template" });
  }

  return (
    <div>
      <ButtonGroup size="sm">
        <Button
          disabled={isButtonEnabled}
          onClick={() => openPreview("episode")}
          variant="primary"
        >
          Episode Preview
        </Button>

        <Button
          disabled={isButtonEnabled}
          onClick={copyCurrentEpisodePreviewLink}
          variant="primary"
        >
          Copy Current Link
        </Button>
      </ButtonGroup>
      <hr />
      <Styled.WrapperGrid>
        {template?.linkArray.map((item: ILinkArray, index: number) => {
          const link = linkParser(item.param);
          return (
            <Styled.WrapperGridItem key={item.param + index}>
              <Styled.LinkGrid>
                <Form.Check
                  type="checkbox"
                  checked={linkParams?.[item.param] || false}
                  onChange={e => handleCheckbox(e.target.checked, item.param)}
                  label={""}
                />

                <div>{item.name}</div>

                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-external-${item.param + index}`}>
                      View
                    </Tooltip>
                  }
                >
                  <ExternalLink size={16} onClick={() => handleLink(link)} />
                </OverlayTrigger>

                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-copy-${item.param + index}`}>
                      Copy
                    </Tooltip>
                  }
                >
                  <Copy size={16} onClick={() => handleCopyText(link)} />
                </OverlayTrigger>
              </Styled.LinkGrid>
            </Styled.WrapperGridItem>
          );
        })}
      </Styled.WrapperGrid>
    </div>
  );
};

export default EpisodeLinks;
