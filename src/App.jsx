import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";
import { CampaignManagementPage } from "./pages/campaign/CampaignManagementPage";
import LogFormatPage from "./pages/format/format";
import LogFilter from "./components/filter/LogFilter";
import FilterManagementPage from "./pages/filter/filterManagementPage";
import ProcessManagementPage from "./pages/process/processManagementPage";

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
  ]);
  return <RouterProvider router={router} />;
}
