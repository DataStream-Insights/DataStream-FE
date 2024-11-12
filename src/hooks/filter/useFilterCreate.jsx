import { useState, useEffect, useCallback } from "react";
import {
  fetchLogItems,
  createLogFilter,
  fetchFilterOptions,
} from "../../api/FilterApi";

// LogFilter 화면에서 사용할 Hook
const useFilterCreate = () => {
  const [items, setItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    idOptions: [],
    operatorOptions: [],
  });

  const [filterSettings, setFilterSettings] = useState({
    name: "", // 필터 이름 필드 추가
    // behaviors: [],
    // repeatCount: 1,
    // timeLimit: {
    //   value: 5,
    //   unit: "분",
    // },
    // collectUnmatched: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 옵션 목록 조회
  const loadOptions = useCallback(async () => {
    try {
      console.log("Loading options...");
      const options = await fetchFilterOptions();
      console.log("Received options:", options);
      setFilterOptions(options);
    } catch (error) {
      console.error("Failed to fetch filter options:", error);
      setFilterOptions({
        idOptions: [],
        operatorOptions: [],
      });
    }
  }, []);

  //1
  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      //2. fetchLogItems로 백에서 목록 받아옴
      const data = await fetchLogItems();
      //3. 데이터 items에 저장
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setError("아이템 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFilter = async (campaignId, formatId, requestData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!requestData.filtername.trim()) {
        throw new Error("필터 이름을 입력해주세요.");
      }

      const result = await createLogFilter(campaignId, formatId, requestData); // API 호출 시 파라미터 전달
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

  //1. useFilterCreate 훅 마운트 될 때 loadItems 실행
  useEffect(() => {
    loadItems();
    loadOptions();
  }, [loadItems, loadOptions]);

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

export default useFilterCreate;
