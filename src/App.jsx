import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";
import { CampaignManagementPage } from "./pages/campaign/CampaignManagementPage";
import LogFormatPage from "./pages/format/format";
import LogFilter from "./components/filter/LogFilter";
import FilterManagementPage from "./pages/filter/filterManagementPage";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CampaignManagementPage /> },
    { path: "/campaignform", element: <CreateCampaign /> },
    { path: "/format", element: <LogFormatPage /> },
    { path: "/format/:campaignId/management", element: <LogFormatPage /> },
    { path: "/filter/:campaignId/:formatId", element: <LogFilter /> },
    {
      path: "/filter",
      element: <FilterManagementPage />,
    },
    {
      path: "/filter/:campaignId/:formatId/filtermanagement",
      element: <FilterManagementPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
