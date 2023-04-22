import * as React from "react";
import { AppRoutes } from "../../types";
import ApplicationHeader from "../Shared/Header";

export interface IControlsLandingProps {}

export const ControlsLanding: React.FC<IControlsLandingProps> = () => {
  return (
    <>
      <ApplicationHeader prefix="Controls" title="PodCast Controls" />
    </>
  );
};
