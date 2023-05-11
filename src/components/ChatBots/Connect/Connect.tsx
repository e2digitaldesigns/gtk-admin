import * as React from "react";

import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import axios from "axios";
import httpService from "../../../utils/httpService";
import { AppRoutes } from "../../../types";

export interface IChatBotsConnectProps {}

export const ChatBotsConnect: React.FC<IChatBotsConnectProps> = () => {
  const navigate = useNavigate();
  const [connected, setConnected] = React.useState<boolean>(false);

  const [apiError, setApiError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    const TWITCH_CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
    const TWITCH_CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
    const redirect = process.env.REACT_APP_TWITCH_REDIRECT_URL || "";

    const setChat = async (token: any) => {
      try {
        const { data } = await httpService.post(
          `${process.env.REACT_APP_REST_API}twitch/initChat`,
          token
        );

        if (data.success) {
          setConnected(true);
        }
      } catch (error) {
        console.error(32, error);
      }
    };

    const fetchData = async () => {
      const link = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(
        redirect
      )}`;

      try {
        const { data } = await axios.post(link);

        if (data.access_token) {
          setChat(data);
        } else {
          throw new Error("No access token");
        }
      } catch (error) {
        console.error(45, error);
        setApiError(true);
      }
    };

    code && fetchData();
  }, []);

  React.useEffect(() => {
    if (connected) {
      setTimeout(() => {
        navigate(AppRoutes.ChatBots);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Twitch Chat Connect</Card.Title>

          {apiError && !connected && (
            <Alert variant="danger">
              There was an error connecting to Twitch. Please try again.
            </Alert>
          )}

          {connected && (
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
