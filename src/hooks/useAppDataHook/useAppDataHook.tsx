import React from "react";
import { AppContext, IntAppData } from "../../context/applicationContext";

const useAppData = () => {
  const appData: IntAppData = React.useContext(AppContext);
  return appData;
};

export default useAppData;
