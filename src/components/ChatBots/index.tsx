import React from "react";

import { ChatBotsConnect, IChatBotsConnectProps } from "./Connect/Connect";
import { ChatBotsLanding, IChatBotsLandingProps } from "./Landing";
import { ChatBotsListing, IChatBotsListingProps } from "./Listing/Listing";

interface IChatBotsProps {
  Connect: React.FC<IChatBotsConnectProps>;
  Landing: React.FC<IChatBotsLandingProps>;
  Listing: React.FC<IChatBotsListingProps>;
}

export const ChatBots: React.FC & IChatBotsProps = () => {
  return null;
};

ChatBots.Connect = ChatBotsConnect;
ChatBots.Landing = ChatBotsLanding;
ChatBots.Listing = ChatBotsListing;
