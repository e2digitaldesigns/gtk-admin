import React from "react";

import { SocialLanding, ISocialLandingProps } from "./Landing";
import { SocialListing, ISocialListingProps } from "./Listing/Listing";
import { SocialNew, ISocialNewProps } from "./New/New";
import { SocialProfile, ISocialProfileProps } from "./Profile/Profile";

interface ISocialProps {
  Landing: React.FC<ISocialLandingProps>;
  Listing: React.FC<ISocialListingProps>;
  New: React.FC<ISocialNewProps>;
  Profile: React.FC<ISocialProfileProps>;
}

export const Socials: React.FC & ISocialProps = () => {
  return null;
};

Socials.Landing = SocialLanding;
Socials.Listing = SocialListing;
Socials.New = SocialNew;
Socials.Profile = SocialProfile;
