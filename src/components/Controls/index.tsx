import React from "react";

import { ControlsLanding, IControlsLandingProps } from "./Landing";
import { ControlListing, IControlListingProps } from "./Listing/Listing";

interface IControlsProps {
  Landing: React.FC<IControlsLandingProps>;
  Listing: React.FC<IControlListingProps>;
}

export const Controls: React.FC & IControlsProps = () => {
  return null;
};

Controls.Landing = ControlsLanding;
Controls.Listing = ControlListing;
