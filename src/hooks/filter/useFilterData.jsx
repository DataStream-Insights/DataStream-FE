import { useState, useEffect, useCallback } from "react";
import { fetchFilters, createLogFilter } from "../../api/FilterApi";
import { useParams } from "react-router-dom";

const useFilterData = () => {
  const { campaignId, formatId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFilters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const filterData = await fetchFilters(campaignId, formatId);
      setData(filterData);
    } catch (error) {
      console.error("Failed to fetch filters:", error);
      setError("필터 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, formatId]);

  const createNewFilter = async (filterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createLogFilter(campaignId, formatId, filterData); // createFilter -> createLogFilter로 변경
      await loadFilters(); // 목록 새로고침
    } catch (error) {
      console.error("Failed to create filter:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  return {
    data,
    isLoading,
    setIsLoading,
    error,
    loadFilters,
    createNewFilter,
  };
};

export default useFilterData;
