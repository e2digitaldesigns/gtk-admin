import * as React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { IEpisodeTicker, TemplateTickerType } from "../../../../types";

interface ITickerProps {
  handleAddTicker: () => void;
  handleChangeTicker: (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => void;
  handleDeleteTicker: (_id: string) => void;
  handleSubmit: () => Promise<void>;
  tickerState: IEpisodeTicker[];
  tickerType: TemplateTickerType;
}

export const EpisodeTicker: React.FC<ITickerProps> = ({
  handleAddTicker,
  handleChangeTicker,
  handleDeleteTicker,
  handleSubmit,
  tickerState,
  tickerType
}) => {
  return (
    <>
      {tickerState.map((ticker: IEpisodeTicker) => (
        <Row key={ticker._id}>
          <Col>
            <InputGroup className="mb-3">
              {tickerType === "advanced" && (
                <Form.Control
                  size="sm"
                  name="title"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeTicker(e, ticker._id)
                  }
                  placeholder="Title"
                  type="text"
                  value={ticker.title}
                />
              )}
              <Form.Control
                size="sm"
                name="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeTicker(e, ticker._id)
                }
                placeholder="Text"
                type="text"
                value={ticker.text}
              />

              <Button
                variant="danger"
                type="button"
                size="sm"
                onClick={() => handleDeleteTicker(ticker._id)}
              >
                Delete
              </Button>
            </InputGroup>
          </Col>
        </Row>
      ))}

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

          <Button
            variant="secondary"
            type="button"
            size="sm"
            onClick={handleAddTicker}
          >
            New News Ticker
          </Button>
        </Col>
      </Row>
    </>
  );
};
