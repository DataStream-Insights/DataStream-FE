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
    dailyVisits: [],
    dayVisits: [],
  });

  // 프로세스별 데이터를 저장할 상태 추가
  const [processSpecificData, setProcessSpecificData] = useState({
    topItems: [],
    // 추후 다른 프로세스별 데이터를 여기에 추가
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
    setSelectedPipeline(pipelineId);
    if (pipelineId) {
      loadProcessSpecificData(pipelineId);
    } else {
      // 프로세스 선택이 해제되면 프로세스별 데이터 초기화
      setProcessSpecificData({
        topItems: [],
        // 추후 다른 프로세스별 데이터도 여기서 초기화
      });
    }
  };

  // 프로세스별 데이터를 로드하는 함수
  const loadProcessSpecificData = async (pipelineId) => {
    try {
      setIsLoading(true);

      // Top5 데이터 로드
      const rawTop5Data = await fetchTop5Items(pipelineId);

      // 데이터 유효성 검사
      const isValidProductData = (data) => {
        // 데이터가 존재하고
        if (!data || !Array.isArray(data)) return false;

        // 최소 1개 이상의 항목이 있고
        if (data.length === 0) return false;

        // 각 항목이 올바른 형식인지 확인
        return data.every((item) => {
          // data 필드가 문자열이고 상품 형식인지 확인
          // v_로 시작하거나 숫자로만 이루어진 문자열은 제외
          const isValidProduct =
            typeof item.data === "string" &&
            !item.data.startsWith("v_") &&
            !/^\d+$/.test(item.data);

          // count가 숫자인지 확인
          const isValidCount =
            typeof item.count === "number" && item.count >= 0;

          return isValidProduct && isValidCount;
        });
      };

      if (isValidProductData(rawTop5Data)) {
        const total = rawTop5Data.reduce((sum, item) => sum + item.count, 0);
        const processedTop5Data = rawTop5Data.map((item) => ({
          item: item.data,
          visits: item.count,
          percentage: Number(((item.count / total) * 100).toFixed(1)),
        }));

        setProcessSpecificData((prev) => ({
          ...prev,
          topItems: processedTop5Data,
        }));
      } else {
        // 유효하지 않은 데이터인 경우 초기화
        setProcessSpecificData((prev) => ({
          ...prev,
          topItems: [],
        }));
      }
    } catch (error) {
      console.error("Failed to load process specific data:", error);
      setProcessSpecificData((prev) => ({
        ...prev,
        topItems: [],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // 기본 데이터 로드
      const [timeData, dailyVisitsData, dayVisitsData] = await Promise.all([
        fetchTimeRangeData(),
        fetchDailyVisits(),
        fetchDayVisits(),
      ]);

      // 문자열 날짜를 Date 객체로 변환
      const transformedDailyVisits = dailyVisitsData.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));

      setDashboardData({
        timeSeriesData: timeData,
        dailyVisits: transformedDailyVisits,
        dayVisits: dayVisitsData,
        summaryData: {
          시간대별방문추이: {
            방문: timeData.reduce((sum, item) => sum + item.방문, 0),
          },
        },
      });
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDateTimeRangeData = async (date) => {
    if (!date) return;

    try {
      setIsLoading(true);
      const formattedDate = date.format("YYYY-MM-DD");
      const data = await fetchDateTimeRange(formattedDate);
      setDateTimeRangeData(data);
    } catch (error) {
      console.error("Failed to load date time range data:", error);
      setDateTimeRangeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      loadDateTimeRangeData(date);
    }
  };

  useEffect(() => {
    loadPipelines();
    loadDashboardData(); // 초기 로드 시 대시보드 데이터를 가져옴
  }, []);

  const refreshDashboard = () => {
    loadDashboardData();
    if (selectedPipeline) {
      loadProcessSpecificData(selectedPipeline);
    }
  };

  return {
    pipelines,
    selectedPipeline,
    selectedDate,
    dateTimeRangeData,
    processSpecificData,
    setSelectedPipeline: handlePipelineSelect,
    handleDateSelect,
    dashboardData,
    isLoading,
    refreshDashboard,
  };
};
