import * as React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IEpisodeHost, IHosts } from "../../../../types";

import _map from "lodash/map";
import _includes from "lodash/includes";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _range from "lodash/range";
import httpService from "../../../../utils/httpService";

interface ITickerProps {
  handleHostSelect: (_id: string, seatNum: string) => void;
  handleSubmit: () => Promise<void>;
  episodeHostsState: IEpisodeHost[];
  maxHosts: number;
}

export const EpisodeHosts: React.FC<ITickerProps> = ({
  handleHostSelect,
  handleSubmit,
  episodeHostsState,
  maxHosts
}) => {
  const [hostState, setHostState] = React.useState<IHosts[]>([]);

  const startingNum = 1;
  const hostCountArray = _range(startingNum, maxHosts + startingNum);

  React.useEffect(() => {
    let stillHere = true;

    const fetchData = async () => {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}hosts`
      );

      if (stillHere) {
        setHostState(data);
      }
    };

    fetchData();

    return () => {
      stillHere = false;
    };
  }, []);

  const handleDisable = (seatNumber: number): boolean => {
    if (seatNumber === 1) {
      return false;
    } else {
      if (_find(episodeHostsState, f => f.seatNum === seatNumber - 1))
        return false;
    }

    return true;
  };

  const filterHost = (hostId: string | undefined): any => {
    const getSeatedHost = _filter(episodeHostsState, f => f.hostId !== hostId);
    const exceptions: string[] = [];
    _map(getSeatedHost, m => exceptions.push(m.hostId));

    return _filter(hostState, f => !_includes(exceptions, f._id));
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    handleHostSelect(e.target.value, e.target.name);
  };

  return (
    <>
      {_map(hostCountArray, (seatNumber: number, index: number) => {
        const value =
          _find(episodeHostsState, f => f.seatNum === seatNumber)?.hostId ||
          "none";

        return (
          <Row key={index}>
            <Col className="mb-3">
              <Form.Select
                disabled={handleDisable(seatNumber)}
                name={String(seatNumber)}
                onChange={e => handleOnchange(e)}
                placeholder="Name"
                size="sm"
                value={value}
              >
                <option value="none">None</option>

                {_map(
                  filterHost(
                    _find(episodeHostsState, f => f.seatNum === seatNumber)
                      ?.hostId
                  ),
                  mHost => (
                    <option value={mHost._id} key={mHost._id}>
                      Seat {seatNumber} - {mHost.name} | {mHost._id}
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
