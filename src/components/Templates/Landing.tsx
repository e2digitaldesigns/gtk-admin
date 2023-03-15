import * as React from "react";
import { AppRoutes } from "../../types";
import ApplicationHeader from "../Shared/Header";

export interface ITemplateLandingProps {}

export const TemplateLanding: React.FC<ITemplateLandingProps> = () => {
  return (
    <>
      <ApplicationHeader
        listingLink={AppRoutes.Templates}
        prefix="Template"
        title="Templates"
      />
    </>
  );
};
