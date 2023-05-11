import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationWrapper from "../components/ApplicationWrapper/ApplicationWrapper";

import { AppRoutes } from "../types";
import { Episodes } from "../components/Episodes";
import { Hosts } from "../components/Hosts";
import { Socials } from "./../components/Socials";
import { Templates } from "./../components/Templates";
import ProtectedRoute from "./ProtectedRoute";
import { Login } from "./../components/Login/Login";
import { Controls } from "../components/Controls";
import { ChatBots } from "../components/ChatBots";
import { ShowRunner } from "../components/ShowRunner/ShowRunner";

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <h1>error</h1>
  },
  {
    path: AppRoutes.ShowRunner,
    element: <ShowRunner />,
    errorElement: <h1>error</h1>
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute isLoggedIn={true}>
        <ApplicationWrapper />
      </ProtectedRoute>
    ),
    errorElement: <h1>error</h1>,

    children: [
      {
        path: AppRoutes.Episodes,
        element: <Episodes.Landing />,

        children: [
          {
            path: AppRoutes.Episodes,
            element: <Episodes.Listing />
          },
          {
            path: AppRoutes.EpisodesNew,
            element: <Episodes.New />
          },
          {
            path: AppRoutes.EpisodesProfile,
            element: <Episodes.Profile />
          }
        ]
      },
      {
        path: AppRoutes.Hosts,
        element: <Hosts.Landing />,

        children: [
          {
            path: AppRoutes.Hosts,
            element: <Hosts.Listing />
          },
          {
            path: AppRoutes.HostNew,
            element: <Hosts.New />
          },
          {
            path: AppRoutes.HostProfile,
            element: <Hosts.Profile />
          }
        ]
      },
      {
        path: AppRoutes.Socials,
        element: <Socials.Landing />,

        children: [
          {
            path: AppRoutes.Socials,
            element: <Socials.Listing />
          },
          {
            path: AppRoutes.SocialNew,
            element: <Socials.New />
          },
          {
            path: AppRoutes.SocialProfile,
            element: <Socials.Profile />
          }
        ]
      },
      {
        path: AppRoutes.Templates,
        element: <Templates.Landing />,

        children: [
          {
            path: AppRoutes.Templates,
            element: <Templates.Listing />
          },
          {
            path: AppRoutes.TemplateNew,
            element: <Templates.New />
          },
          {
            path: AppRoutes.TemplateProfile,
            element: <Templates.Profile />
          }
        ]
      },
      {
        path: AppRoutes.Controls,
        element: <Controls.Landing />,

        children: [
          {
            path: AppRoutes.Controls,
            element: <Controls.Listing />
          }
        ]
      },
      {
        path: AppRoutes.ChatBots,
        element: <ChatBots.Landing />,

        children: [
          {
            path: AppRoutes.ChatBots,
            element: <ChatBots.Listing />
          },
          {
            path: AppRoutes.ChatBotsConnectTwitch,
            element: <ChatBots.Connect />
          }
        ]
      }
    ]
  }
]);

export const AppRouter: React.FC<{}> = () => {
  return <RouterProvider router={applicationRouter} />;
};
