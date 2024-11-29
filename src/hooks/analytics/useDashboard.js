import { useState, useEffect } from "react";
import {
  fetchProcesses,
  fetchTop5Items,
  fetchTimeRangeData,
  fetchDailyVisits,
  fetchDayVisits,
  fetchDateTimeRange,
} from "../../api/DashboardApi";

export const useDashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTimeRangeData, setDateTimeRangeData] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    statusDistribution: { 신규방문: 0, 재방문: 0 },
    summaryData: {
      시간대별방문추이: { 방문: 0 },
    },
    timeSeriesData: [],
    topPages: [],
    topItems: [],
    dailyVisits: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const loadPipelines = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProcesses();
      setPipelines(data);
    } catch (error) {
      console.error("Failed to load pipelines:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePipelineSelect = (pipelineId) => {
    const selectedPipelineData = pipelines.find((p) => p.id === pipelineId);
    console.log(
      "Will send GET request to:",
      `/dashboard/processes/top5/${selectedPipelineData?.id}`
    );
    setSelectedPipeline(selectedPipelineData?.id);
  };

  const loadDashboardData = async (pipelineId) => {
    if (!pipelineId) return;

    try {
      setIsLoading(true);

      // 데이터 로드
      const [timeData, rawTop5Data, dailyVisitsData, dayVisitsData] =
        await Promise.all([
          fetchTimeRangeData(pipelineId),
          fetchTop5Items(pipelineId),
          fetchDailyVisits(pipelineId),
          fetchDayVisits(pipelineId),
        ]);

      // Top5 데이터 처리
      const total = rawTop5Data.reduce((sum, item) => sum + item.count, 0);
      const processedTop5Data = rawTop5Data.map((item) => ({
        item: item.data,
        visits: item.count,
        percentage: Number(((item.count / total) * 100).toFixed(1)),
      }));

      // 문자열 날짜를 Date 객체로 변환
      const transformedDailyVisits = dailyVisitsData.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));

      setDashboardData((prev) => ({
        ...prev,
        timeSeriesData: timeData,
        topItems: processedTop5Data,
        dailyVisits: transformedDailyVisits,
        dayVisits: dayVisitsData, // 요일별 방문 데이터 추가
        summaryData: {
          시간대별방문추이: {
            방문: timeData.reduce((sum, item) => sum + item.방문, 0),
          },
        },
      }));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDateTimeRangeData = async (pipelineId, date) => {
    if (!pipelineId || !date) return;

    try {
      setIsLoading(true);
      console.log("Loading date time range data:", { pipelineId, date });

      const data = await fetchDateTimeRange(pipelineId, date);
      console.log("Received date time range data:", data);

      setDateTimeRangeData(data);
      console.log("Updated dateTimeRangeData state:", data);
    } catch (error) {
      console.error("Failed to load date time range data:", error);
      setDateTimeRangeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    console.log("Date selected:", date);
    console.log("Current selectedPipeline:", selectedPipeline);

    setSelectedDate(date);
    if (selectedPipeline && date) {
      const formattedDate = date.format("YYYY-MM-DD");
      console.log("Formatted date:", formattedDate);
      loadDateTimeRangeData(selectedPipeline, formattedDate);
    }
  };

  useEffect(() => {
    loadPipelines();
  }, []);

  useEffect(() => {
    if (selectedPipeline) {
      loadDashboardData(selectedPipeline);
    }
  }, [selectedPipeline]);

  const refreshDashboard = () => {
    if (selectedPipeline) {
      loadDashboardData(selectedPipeline);
    }
  };

  return {
    pipelines,
    selectedPipeline,
    selectedDate,
    dateTimeRangeData,
    setSelectedPipeline: handlePipelineSelect,
    handleDateSelect,
    dashboardData,
    isLoading,
    refreshDashboard,
  };
};
