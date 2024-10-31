import { useState, useEffect, useCallback } from "react";
import { fetchFilters } from "../../api/FilterListApi";

const useFilter = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 필터 목록 조회
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

  // 초기 데이터 로딩
  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFilter;
