import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";
import { CampaignManagementPage } from "./pages/main/CampaignManagementPage";
import LogFormatPage from "./pages/format/format";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CampaignManagementPage /> },

    { path: "/campaignform", element: <CreateCampaign /> }, //캠페인 생성하기

    { path: "/format", element: <LogFormatPage /> }, //포맷팅
  ]);

  return <RouterProvider router={router} />;
}
