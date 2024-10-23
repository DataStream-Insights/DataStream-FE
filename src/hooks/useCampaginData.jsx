import { useState, useEffect, useCallback } from "react";
import { fetchCampaignData, createCampaignData } from "../api/CampaignApi";

const useCampaignData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 캠페인 목록 조회
  const loadCampaigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const campaignData = await fetchCampaignData();
      setData(campaignData);
    } catch (error) {
      console.error("Failed to fetch campaign data:", error);
      setError("캠페인 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 캠페인 생성
  const createCampaign = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createCampaignData(formData);
      // 새로운 캠페인을 목록에 추가
      setData((prevData) => [...prevData, result]);
      return result;
    } catch (error) {
      console.error("Failed to create campaign:", error);
      setError("캠페인 생성에 실패했습니다.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  return {
    data,
    isLoading,
    error,
    createCampaign,
    refreshCampaigns: loadCampaigns,
  };
};

export default useCampaignData;
