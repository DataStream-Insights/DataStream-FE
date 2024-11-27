import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";
import { CampaignManagementPage } from "./pages/campaign/CampaignManagementPage";
import LogFormatPage from "./pages/format/format";
import LogFilter from "./components/filter/LogFilter";
import FilterManagementPage from "./pages/filter/filterManagementPage";
import ProcessManagementPage from "./pages/process/processManagementPage";
import ProcessCreate from "./components/process/processCreate";
import ProcessDetail from "./components/process/processDetail";
import DataManagementPage from "./pages/analytics/dataManagement";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CampaignManagementPage /> },
    { path: "/campaignform", element: <CreateCampaign /> },
    { path: "/format", element: <LogFormatPage /> },
    { path: "/format/:campaignId/management", element: <LogFormatPage /> },
    { path: "/filter/create", element: <LogFilter /> },
    { path: "/filter/create/:campaignId/:formatId", element: <LogFilter /> },
    {
      path: "/filter/filtermanagement",
      element: <FilterManagementPage />,
    },
    {
      path: "/filter/:campaignId/:formatId/filtermanagement",
      element: <FilterManagementPage />,
    },
    {
      path: "/process",
      element: <ProcessManagementPage />,
    },
    {
      path: "/process/create",
      element: <ProcessCreate />,
    },
    {
      path: "/process/:id",
      element: <ProcessDetail />,
    },
    {
      path: "/analytics",
      element: <DataManagementPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
