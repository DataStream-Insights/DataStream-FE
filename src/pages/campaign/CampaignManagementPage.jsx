import React from "react";
import { Layout } from "../../components/Layout";
import { CampaignTable } from "../../components/CampaginTable";

export function CampaignManagementPage() {
  return (
    <Layout title="캠페인 관리">
      <CampaignTable />
    </Layout>
  );
}
