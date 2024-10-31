import { useState, useEffect, useCallback } from "react";
import { fetchFilters } from "../../api/FilterApi";

// FilterManagement 화면에서 사용할 Hook
const useFilterData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFilters = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const filterData = await fetchFilters();
      setData(filterData);
    } catch (error) {
      console.error("Failed to fetch filters:", error);
      setError("필터 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFilterData;
