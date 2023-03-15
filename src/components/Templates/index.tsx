import React from "react";

import { TemplateLanding, ITemplateLandingProps } from "./Landing";
import { TemplateListing, ITemplateListingProps } from "./Listing/Listing";
import { TemplateNew, ITemplateNewProps } from "./New/New";
import { TemplateProfile, ITemplateProfileProps } from "./Profile/Profile";

interface ISocialProps {
  Landing: React.FC<ITemplateLandingProps>;
  Listing: React.FC<ITemplateListingProps>;
  New: React.FC<ITemplateNewProps>;
  Profile: React.FC<ITemplateProfileProps>;
}

export const Templates: React.FC & ISocialProps = () => {
  return null;
};

Templates.Landing = TemplateLanding;
Templates.Listing = TemplateListing;
Templates.New = TemplateNew;
Templates.Profile = TemplateProfile;
