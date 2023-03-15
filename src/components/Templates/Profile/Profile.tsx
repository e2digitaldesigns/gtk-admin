import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { ITemplate, defaultTemplateState, ILinkArray } from "../../../types";
import Table from "react-bootstrap/Table";
import { Copy } from "react-feather";
import * as Styled from "./Profile.style";
import { toast } from "react-toastify";
import httpService from "../../../utils/httpService";
import jwtDecode from "jwt-decode";

export interface ITemplateProfileProps {}

export const TemplateProfile: React.FC<ITemplateProfileProps> = () => {
  const { id } = useParams();
  const [state, setState] = React.useState<ITemplate>(defaultTemplateState);
  const [userId, setUserId] = React.useState<string>("");

  const LINK = `${process.env.REACT_APP_CLOUD_OVERLAY_URL}${state._id}&uid=${userId}`;

  React.useEffect(() => {
    if (process.env.REACT_APP_JWT_TOKEN) {
      const { _id } = jwtDecode(
        localStorage.getItem(process.env.REACT_APP_JWT_TOKEN) || ""
      ) as { _id: string };
      setUserId(_id);
    }
  }, []);

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      try {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_REST_API}templates/${id}`
        );

        if (stillHere) {
          setState(data);
        }
      } catch (error) {}
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, [id]);

  const linkParser = (layer: string): string => {
    return `${LINK}&${layer}=1`;
  };

  const handleCopyText = (string: string): void => {
    navigator.clipboard.writeText(string);
    toast.success("The link was copied to the clipboard!");
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{state.name}</Card.Title>
        <Card.Title style={{ fontSize: "14px" }}>
          <Copy size={16} onClick={() => handleCopyText(LINK)} /> {LINK}
        </Card.Title>

        <Table striped bordered hover>
          <tbody>
            {state?.linkArray.map((item: ILinkArray, index: number) => (
              <tr key={item.param + index}>
                <td>
                  <div>
                    <strong>{item.name}</strong>
                  </div>

                  <Styled.LinkGrid>
                    <Copy
                      size={16}
                      onClick={() => handleCopyText(linkParser(item.param))}
                    />

                    {linkParser(item.param)}
                  </Styled.LinkGrid>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
