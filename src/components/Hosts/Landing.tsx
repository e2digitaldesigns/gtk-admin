import * as React from "react";
import { AppRoutes } from "../../types";
import ApplicationHeader from "../Shared/Header";

export interface IHostLandingProps {}

export const HostLanding: React.FC<IHostLandingProps> = () => {
  return (
    <>
      <ApplicationHeader
        listingLink={AppRoutes.Hosts}
        newLink={AppRoutes.HostNew}
        prefix="Host"
        title="Hosts"
      />
    </>
  );
};
