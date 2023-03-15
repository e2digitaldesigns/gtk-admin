import React from "react";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./context/applicationContext";

import * as Styled from "./styles/global.style";
import "react-toastify/dist/ReactToastify.css";
import { AppRouter } from "./routes";

function App() {
  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env?.REACT_APP_GOOGLE_CLIENT_ID || ""}
      >
        <AppContextProvider>
          <ToastContainer
            autoClose={3000}
            pauseOnFocusLoss={false}
            theme="colored"
          />
          <Styled.GlobalStyle />
          <AppRouter />
        </AppContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
