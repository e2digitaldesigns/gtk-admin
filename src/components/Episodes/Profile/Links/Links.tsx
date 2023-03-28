import React from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { Copy } from "react-feather";
import jwtDecode from "jwt-decode";

import * as Styled from "./Links.style";
import { ILinkArray, ITemplate } from "../../../../types";

interface IEpisodeLinksProps {
  template: ITemplate;
  linkParams: { [key: string]: boolean } | undefined;
  setLinkParams: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean } | undefined>
  >;
}

const EpisodeLinks: React.FC<IEpisodeLinksProps> = ({
  linkParams,
  setLinkParams,
  template
}) => {
  const [userId, setUserId] = React.useState<string>("");
  const LINK = `${process.env.REACT_APP_CLOUD_OVERLAY_URL}${template._id}&uid=${userId}`;

  React.useEffect(() => {
    if (process.env.REACT_APP_JWT_TOKEN) {
      const { _id } = jwtDecode(
        localStorage.getItem(process.env.REACT_APP_JWT_TOKEN) || ""
      ) as { _id: string };
      setUserId(_id);
    }
  }, []);

  const linkParser = (layer: string): string => {
    return `${LINK}&${layer}=1`;
  };

  const handleCopyText = (string: string): void => {
    navigator.clipboard.writeText(string);
    toast.success("The link was copied to the clipboard!");
  };

  const handleCheckbox = (checked: boolean, param: string): void => {
    setLinkParams({ ...linkParams, [param]: checked });
  };

  return (
    <div>
      {template?.linkArray.map((item: ILinkArray, index: number) => {
        const link = linkParser(item.param);
        return (
          <Alert key={item.param + index} variant="secondary">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                checked={linkParams?.[item.param] || false}
                onChange={e => handleCheckbox(e.target.checked, item.param)}
                label={item.name}
              />
            </Form.Group>

            <hr />
            <Styled.LinkGrid>
              <Copy size={16} onClick={() => handleCopyText(link)} />
              <div> {link}</div>
            </Styled.LinkGrid>
          </Alert>
        );
      })}
    </div>
  );
};

export default EpisodeLinks;
