import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateCampaign } from "./pages/campaign/createCampaign";

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <div>Home</div> },

    { path: "/campaignform", element: <CreateCampaign /> }, //캠페인 생성하기
  ]);

  return <RouterProvider router={router} />;
}
