import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";
import { CampaignManagementPage } from "./pages/main/CampaignManagementPage";
import LogFormatPage from "./pages/format/format";
import LogFilter from "./components/LogFilter";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CampaignManagementPage /> },

    { path: "/campaignform", element: <CreateCampaign /> }, //캠페인 생성하기

    { path: "/format", element: <LogFormatPage /> }, //포맷팅

    { path: "/filter", element: <LogFilter />} //필터링
  ]);

  return <RouterProvider router={router} />;
}
