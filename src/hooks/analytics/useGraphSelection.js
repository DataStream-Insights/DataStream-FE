import { useState, useEffect } from "react";
import { fetchGraphList } from "../../api/GraphApi";

export const useGraphSelection = () => {
  const [graphOptions, setGraphOptions] = useState([]);
  const [graphSelections, setGraphSelections] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 그래프 목록 가져오기
  const loadGraphList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchGraphList();
      setGraphOptions(
        data.map((graph) => ({
          value: graph.id,
          label: graph.name,
        }))
      );
    } catch (err) {
      setError("그래프 목록을 불러오는데 실패했습니다.");
      setGraphOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGraphList();
  }, []);

  // 사용 가능한 그래프 옵션 필터링
  const getAvailableOptions = (currentId) => {
    const selectedValues = graphSelections
      .filter((selection) => selection.id !== currentId)
      .map((selection) => selection.selectedGraph);

    return graphOptions.filter(
      (option) => !selectedValues.includes(option.value)
    );
  };

  // 그래프 선택 처리
  const handleGraphSelect = (value, id) => {
    setGraphSelections((prev) =>
      prev.map((selection) =>
        selection.id === id ? { ...selection, selectedGraph: value } : selection
      )
    );
  };

  // 그래프 선택 추가
  const addGraphSelection = () => {
    if (graphSelections.length < 4) {
      setGraphSelections((prev) => [
        ...prev,
        { id: nextId, selectedGraph: null },
      ]);
      setNextId((prev) => prev + 1);
    }
  };

  // 그래프 선택 제거
  const removeGraphSelection = (id) => {
    setGraphSelections((prev) =>
      prev.filter((selection) => selection.id !== id)
    );
  };

  // 선택된 그래프 데이터 반환
  const getSelectedGraphs = () => {
    return graphSelections
      .filter((selection) => selection.selectedGraph !== null)
      .map((selection) => selection.selectedGraph);
  };

  return {
    graphOptions,
    graphSelections,
    isLoading,
    error,
    getAvailableOptions,
    handleGraphSelect,
    addGraphSelection,
    removeGraphSelection,
    getSelectedGraphs,
    refreshGraphList: loadGraphList,
  };
};
