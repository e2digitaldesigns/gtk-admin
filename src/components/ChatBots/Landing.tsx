import * as React from "react";
import ApplicationHeader from "../Shared/Header";

export interface IChatBotsLandingProps {}

export const ChatBotsLanding: React.FC<IChatBotsLandingProps> = () => {
  return (
    <>
      <ApplicationHeader prefix="ChatBots" title="Chat Bots" />
    </>
  );
};
