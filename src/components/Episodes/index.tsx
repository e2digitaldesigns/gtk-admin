import React from "react";

import { EpisodeLanding, IEpisodeLandingProps } from "./Landing";
import { EpisodeListing, IEpisodeListingProps } from "./Listing/Listing";
import { EpisodeNew, IEpisodeNewProps } from "./New/New";
import { EpisodeProfile, IEpisodeProfileProps } from "./Profile/Profile";

interface IEpisodesProps {
  Landing: React.FC<IEpisodeLandingProps>;
  Listing: React.FC<IEpisodeListingProps>;
  New: React.FC<IEpisodeNewProps>;
  Profile: React.FC<IEpisodeProfileProps>;
}

export const Episodes: React.FC & IEpisodesProps = () => {
  return null;
};

Episodes.Landing = EpisodeLanding;
Episodes.Listing = EpisodeListing;
Episodes.New = EpisodeNew;
Episodes.Profile = EpisodeProfile;
