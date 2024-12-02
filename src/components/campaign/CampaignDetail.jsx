import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Form } from "antd";
import useCampaignDetail from "../../hooks/campaign/useCampaignDetail";
import * as S from "../../styles/campaign/campaignDetail";
import Loading from "../Loading";

const CampaignDetail = ({ campaign, onClose }) => {
  const { detail, isLoading, error, loadCampaignDetail } = useCampaignDetail();

  useEffect(() => {
    if (campaign?.id) {
      loadCampaignDetail(campaign.id);
    }
  }, [campaign, loadCampaignDetail]);

  const getVisibilityText = (visibility) => {
    const visibilityMap = {
      public: "전체공개",
      department: "부서공개",
      private: "비공개",
    };
    return visibilityMap[visibility] || visibility;
  };

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!detail) return null;

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <S.Header>
        <S.Title>캠페인 상세정보</S.Title>
        <S.CloseButton onClick={onClose}>
          <X size={20} />
        </S.CloseButton>
      </S.Header>

      <S.Content>
        <S.InfoGroup>
          <S.InfoLabel>캠페인 ID</S.InfoLabel>
          <S.InfoText>{detail.campaignId}</S.InfoText>
        </S.InfoGroup>

        <S.InfoGroup>
          <S.InfoLabel>캠페인명</S.InfoLabel>
          <S.InfoText>{detail.campaignName}</S.InfoText>
        </S.InfoGroup>

        <S.FormGrid>
          <S.InfoGroup>
            <S.InfoLabel>분류1</S.InfoLabel>
            <S.InfoText>{detail.campaignClassification1}</S.InfoText>
          </S.InfoGroup>

          <S.InfoGroup>
            <S.InfoLabel>분류2</S.InfoLabel>
            <S.InfoText>{detail.campaignClassification2}</S.InfoText>
          </S.InfoGroup>
        </S.FormGrid>

        <S.FormGrid>
          <S.InfoGroup>
            <S.InfoLabel>시작일자</S.InfoLabel>
            <S.InfoText>{detail.startDate}</S.InfoText>
          </S.InfoGroup>

          <S.InfoGroup>
            <S.InfoLabel>종료일자</S.InfoLabel>
            <S.InfoText>{detail.endDate}</S.InfoText>
          </S.InfoGroup>
        </S.FormGrid>

        <S.InfoGroup>
          <S.InfoLabel>캠페인 설명</S.InfoLabel>
          <S.Description>{detail.campaignDescription}</S.Description>
        </S.InfoGroup>

        <S.InfoGroup>
          <S.InfoLabel>공개 여부</S.InfoLabel>
          <S.InfoText>{getVisibilityText(detail.visibility)}</S.InfoText>
        </S.InfoGroup>

        {/* <S.InfoGroup>
          <S.InfoLabel>생성일자</S.InfoLabel>
          <S.InfoText>{detail.createdDate}</S.InfoText>
        </S.InfoGroup> */}
      </S.Content>
    </div>
  );
};

export default CampaignDetail;
