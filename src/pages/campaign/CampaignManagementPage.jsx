import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { CampaignTable } from "../../components/campaign/CampaignTable";
import CreateCampaign from "./createCampaign";
import * as S from "../../styles/format/formatPageStyle"; // format 스타일 재사용

export function CampaignManagementPage() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleClose = () => {
    setIsCreating(false);
  };

  return (
    <Layout title="캠페인 관리">
      <S.Container>
        <S.ListContainer className={!isCreating ? "expanded" : ""}>
          <CampaignTable onCreate={handleCreate} isDetailVisible={isCreating} />
        </S.ListContainer>
        {isCreating && (
          <S.DetailContainer className="visible">
            <CreateCampaign onClose={handleClose} />
          </S.DetailContainer>
        )}
      </S.Container>
    </Layout>
  );
}
