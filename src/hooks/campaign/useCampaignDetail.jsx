import { useState, useCallback } from "react";
import { fetchCampaignDetail } from "../../api/CampaignApi";

const useCampaignDetail = () => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCampaignDetail = useCallback(async (campaignId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCampaignDetail(campaignId);
      setDetail(data);
    } catch (error) {
      setError("캠페인 상세 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    detail,
    isLoading,
    error,
    loadCampaignDetail,
  };
};

export default useCampaignDetail;
