import * as React from "react";
import { AppRoutes } from "../../types";
import ApplicationHeader from "../Shared/Header";

export interface ISocialLandingProps {}

export const SocialLanding: React.FC<ISocialLandingProps> = () => {
  return (
    <>
      <ApplicationHeader
        listingLink={AppRoutes.Socials}
        newLink={AppRoutes.SocialNew}
        prefix="Social Network"
        title="Social Networks"
      />
    </>
  );
};
