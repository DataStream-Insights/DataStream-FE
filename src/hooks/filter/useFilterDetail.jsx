import { useState, useEffect } from "react";
import { fetchFilterDetail } from "../../api/FilterApi";

const useFilterDetail = (filterId, isOpen) => {
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
        console.log("Fetching details for filtermanage_id:", filterId);
        const data = await fetchFilterDetail(filterId);
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
  }, [filterId, isOpen]);

  return {
    detailData,
    isLoading,
    error,
  };
};

export default useFilterDetail;
