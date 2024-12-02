import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import CampaignTable from "../../components/campaign/CampaignTable";
import CreateCampaign from "./createCampaign";
import CampaignDetail from "../../components/campaign/CampaignDetail";
import * as S from "../../styles/format/formatPageStyle";

export function CampaignManagementPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const isDetailVisible = selectedCampaign || isCreating;

  const handleCreate = () => {
    setSelectedCampaign(null);
    setIsCreating(true);
  };

  const handleSelect = async (campaign) => {
    setIsCreating(false);
    setSelectedCampaign(campaign);
  };

  const handleClose = () => {
    setIsCreating(false);
    setSelectedCampaign(null);
  };

  return (
    <Layout>
      <S.Container>
        <S.ListContainer className={!isDetailVisible ? "expanded" : ""}>
          <CampaignTable
            onCreate={handleCreate}
            onSelect={handleSelect}
            isDetailVisible={isDetailVisible}
          />
        </S.ListContainer>

        {isDetailVisible && (
          <S.DetailContainer className="visible">
            {isCreating ? (
              <CreateCampaign onClose={handleClose} />
            ) : (
              <CampaignDetail
                campaign={selectedCampaign}
                onClose={handleClose}
              />
            )}
          </S.DetailContainer>
        )}
      </S.Container>
    </Layout>
  );
}

export default CampaignManagementPage;
