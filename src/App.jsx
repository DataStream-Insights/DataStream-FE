import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";
import { CampaignManagementPage } from "./pages/campaign/CampaignManagementPage";
import LogFormatPage from "./pages/format/format";
import LogFilter from "./components/LogFilter";
import SamplemainPage from "./pages/main/samplemain";
import FilterManagementPage from "./pages/filter/filterManagementPage";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CampaignManagementPage /> },

    // { path: "/campaignmanagement", element: <CampaignManagementPage /> },

    { path: "/campaignform", element: <CreateCampaign /> }, //캠페인 생성하기

    { path: "/format", element: <LogFormatPage /> }, //포맷팅

    { path: "/filter", element: <LogFilter /> }, //필터링

    { path: "/filtermanagement", element: <FilterManagementPage /> }, //필터링 관리 페이지
  ]);

  return <RouterProvider router={router} />;
}
