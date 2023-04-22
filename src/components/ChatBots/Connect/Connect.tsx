import * as React from "react";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import axios from "axios";
import httpService from "../../../utils/httpService";

export interface IChatBotsConnectProps {}

export const ChatBotsConnect: React.FC<IChatBotsConnectProps> = () => {
  const [connected, setConnected] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
    const TWITCH_CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
    const redirect = process.env.REACT_APP_TWITCH_REDIRECT_URL;

    const setChat = async (token: any) => {
      try {
        const { data } = await httpService.post(
          `${process.env.REACT_APP_REST_API}twitch/initChat`,
          token
        );

        setConnected(true);
      } catch (error) {
        console.error(32, error);
        setConnected(false);
      }
    };

    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirect}`
        );

        setChat(data);
      } catch (error) {
        console.error(45, error);
        setConnected(false);
      }
    };

    code && fetchData();
  }, []);

  React.useEffect(() => {
    if (connected === true) {
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, [connected]);

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Twitch Chat Connect</Card.Title>

          {connected === false && (
            <Alert variant="danger">
              There was an error connecting to Twitch. Please try again.
            </Alert>
          )}

          {connected === true && (
            <Alert variant="success">
              You have successfully connected to Twitch.
            </Alert>
          )}

          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
