import { useState, useEffect } from "react";
import { fetchPipelines } from "../../api/ProcessApi";
import { mockDashboardData } from "../../mocks/dashboardData";

export const useDashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState("");
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [isLoading, setIsLoading] = useState(false);

  const loadPipelines = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPipelines();
      setPipelines(data);
      if (data.length > 0 && !selectedPipeline) {
        setSelectedPipeline(data[0].pipelineId);
      }
    } catch (error) {
      console.error("Failed to load pipelines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDashboard = () => {
    // API 연동 시 여기서 데이터를 새로 불러오기
    setDashboardData({
      ...mockDashboardData,
      timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
        hour: String(i).padStart(2, "0"),
        방문: Math.floor(Math.random() * 200),
        방문자: Math.floor(Math.random() * 150),
      })),
    });
  };

  useEffect(() => {
    loadPipelines();
  }, []);

  return {
    pipelines,
    selectedPipeline,
    setSelectedPipeline,
    dashboardData,
    isLoading,
    refreshDashboard,
  };
};
