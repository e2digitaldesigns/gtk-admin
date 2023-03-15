import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import httpService from "../../utils/httpService";
import { useNavigate } from "react-router-dom";

export const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (!credentials) return;

    const oAuth = async () => {
      try {
        const { data } = await httpService.post(
          process.env.REACT_APP_REST_API + "auth/google",
          {
            token: credentials
          }
        );

        if (data && process.env?.REACT_APP_JWT_TOKEN) {
          localStorage.setItem(process.env.REACT_APP_JWT_TOKEN, data);
          navigate("/admin");
        }
      } catch (error) {
        console.error(error);
      }
    };

    oAuth();
  }, [credentials]);

  return (
    <>
      <GoogleLogin
        width={"300px"}
        onSuccess={credentialResponse => {
          setCredentials(credentialResponse?.credential);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
      ;
    </>
  );
};
