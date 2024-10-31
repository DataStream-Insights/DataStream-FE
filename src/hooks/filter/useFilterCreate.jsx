import { useState, useEffect, useCallback } from "react";
import { fetchLogItems, createLogFilter } from "../../api/FilterApi";

// LogFilter 화면에서 사용할 Hook
const useLogFilter = () => {
  const [items, setItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    idOptions: [],
    operatorOptions: [],
    actionOptions: [],
  });

  const [filterSettings, setFilterSettings] = useState({
    behaviors: [],
    repeatCount: 1,
    timeLimit: {
      value: 5,
      unit: "분",
    },
    collectUnmatched: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 옵션 목록 조회
  const loadOptions = useCallback(async () => {
    try {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error("Failed to fetch filter options:", error);
    }
  }, []);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchLogItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setError("아이템 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFilter = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createLogFilter(filterSettings);
      return result;
    } catch (error) {
      console.error("Failed to save filter:", error);
      setError("필터 저장에 실패했습니다.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilterSettings = (updates) => {
    setFilterSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  useEffect(() => {
    loadItems();
    loadOptions();
  }, [loadItems]);

  return {
    items,
    filterSettings,
    filterOptions,
    isLoading,
    error,
    updateFilterSettings,
    saveFilter,
  };
};

export default useLogFilter;
