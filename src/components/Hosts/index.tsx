import React from "react";

import { HostLanding, IHostLandingProps } from "./Landing";
import { HostListing, IHostListingProps } from "./Listing/Listing";
import { HostNew, IHostNewProps } from "./New/New";
import { HostProfile, IHostProfileProps } from "./Profile/Profile";

interface IHostProps {
  Landing: React.FC<IHostLandingProps>;
  Listing: React.FC<IHostListingProps>;
  New: React.FC<IHostNewProps>;
  Profile: React.FC<IHostProfileProps>;
}

export const Hosts: React.FC & IHostProps = () => {
  return null;
};

Hosts.Landing = HostLanding;
Hosts.Listing = HostListing;
Hosts.New = HostNew;
Hosts.Profile = HostProfile;
