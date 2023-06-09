import * as React from "react";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import httpService from "../../../utils/httpService";

export interface IChatBotsListingProps {}

export const ChatBotsListing: React.FC<IChatBotsListingProps> = () => {
  const redirect = process.env.REACT_APP_TWITCH_REDIRECT_URL;
  const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
  const [authorized, setAuthorized] = React.useState<boolean>(false);

  const link: string = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=chat:read+chat:edit&force_verify=false`;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_REST_API}twitch/isConnected`
        );

        if (data.isConnected) {
          setAuthorized(true);
        }
      } catch (error) {
        console.error(32, error);
      }
    };

    fetchData();
  }, []);

  const handleLink = (): void => {
    // window.open(link);
    window.location.replace(link);
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_REST_API}twitch/disconnect`
      );

      if (data.success) {
        setAuthorized(false);
      }
    } catch (error) {
      console.error(65, error);
    }
  };

  return (
    <>
      <Alert>
        Allow GTK to read your chat and respond to commands. Some GTK templates
        can shwo chat messgaes on screen.
      </Alert>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Twitch</Card.Title>

          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

          {authorized ? (
            <>
              <Card.Text>Your Twitch account is connected to GTK</Card.Text>
              <Card.Text>
                <Button onClick={handleDisconnect} size="sm" variant="danger">
                  DisConnect from GTK-Bot
                </Button>
              </Card.Text>
            </>
          ) : (
            <Card.Text>
              <Button size="sm" onClick={handleLink}>
                Connect
              </Button>
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
