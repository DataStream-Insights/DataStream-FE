import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFilterDetail } from "../../api/FilterApi";

const useFilterDetail = (filterId, isOpen) => {
  const { campaignId, formatId } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      if (!filterId || !isOpen) {
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching details for filter:", {
          campaignId,
          formatId,
          filterId,
        });
        const data = await fetchFilterDetail(campaignId, formatId, filterId);
        console.log("Received detail data:", data);
        setDetailData(data);
        setError(null);
      } catch (err) {
        setError("상세 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDetail();
  }, [filterId, isOpen, campaignId, formatId]);

  return {
    detailData,
    isLoading,
    error,
  };
};

export default useFilterDetail;
