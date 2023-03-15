import * as React from "react";
import { AppRoutes } from "../../types";

import ApplicationHeader from "../Shared/Header";

export interface IEpisodeLandingProps {}

export const EpisodeLanding: React.FC<IEpisodeLandingProps> = ({}) => {
  return (
    <>
      <ApplicationHeader
        listingLink={AppRoutes.Episodes}
        newLink={AppRoutes.EpisodesNew}
        prefix="Episode"
        title="Episodes"
      />
    </>
  );
};
