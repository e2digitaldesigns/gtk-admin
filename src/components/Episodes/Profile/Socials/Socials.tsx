import * as React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IEpisodeSocials, ISocials } from "../../../../types";

import _map from "lodash/map";
import _includes from "lodash/includes";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _range from "lodash/range";
import httpService from "../../../../utils/httpService";

interface IEpisodeSocialProps {
  handleSocialSelect: (_id: string, seatNum: string) => void;
  handleSubmit: () => Promise<void>;
  episodeSocialsState: IEpisodeSocials[];
}

export const EpisodeSocials: React.FC<IEpisodeSocialProps> = ({
  handleSocialSelect,
  handleSubmit,
  episodeSocialsState
}) => {
  const [socialState, setSocialsState] = React.useState<ISocials[]>([]);

  const startingNum = 1;
  const socialCountArray = _range(
    startingNum,
    socialState.length + startingNum
  );

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}socials`
      );

      if (stillHere) {
        setSocialsState(data);
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, []);

  const handleDisable = (order: number): boolean => {
    if (order === 1) {
      return false;
    } else {
      if (_find(episodeSocialsState, f => f.order === order - 1)) return false;
    }

    return true;
  };

  const filterHost = (_id: string | undefined): any => {
    const getSeatedHost = _filter(episodeSocialsState, f => f.socialId !== _id);
    const exceptions: string[] = [];
    _map(getSeatedHost, m => exceptions.push(m.socialId));
    return _filter(socialState, f => !_includes(exceptions, f._id));
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    handleSocialSelect(e.target.value, e.target.name);
  };

  return (
    <>
      {_map(socialCountArray, (order: number, index: number) => {
        const value =
          _find(episodeSocialsState, f => f.order === order)?.socialId ||
          "none";

        return (
          <Row key={index}>
            <Col className="mb-3">
              <Form.Select
                disabled={handleDisable(order)}
                name={String(order)}
                onChange={e => handleOnchange(e)}
                placeholder="Name"
                size="sm"
                value={value}
              >
                <option value="none">None</option>

                {_map(
                  filterHost(
                    _find(episodeSocialsState, f => f.order === order)?.socialId
                  ),
                  social => (
                    <option value={social._id} key={social._id}>
                      {social.site} | {social.username}
                    </option>
                  )
                )}
              </Form.Select>
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col>
          <Button
            className="me-2"
            variant="primary"
            type="button"
            size="sm"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};
