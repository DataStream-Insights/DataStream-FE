import React from "react";
import { Layout } from "../../components/Layout";
import { CampaignTable } from "../../components/campaign/CampaignTable";

export function CampaignManagementPage() {
  return (
    <Layout title="캠페인 관리">
      <CampaignTable />
    </Layout>
  );
}
