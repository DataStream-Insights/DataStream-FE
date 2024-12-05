import { useState, useEffect } from "react";
import {
  fetchProcesses,
  fetchTop5Items,
  fetchTimeRangeData,
  fetchDailyVisits,
  fetchDayVisits,
  fetchDateTimeRange,
  fetchTreemap,
  fetchPriceBoard,
  fetchPieChart,
} from "../../api/DashboardApi";

export const useDashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTimeRangeData, setDateTimeRangeData] = useState(null);
  const [selectedGraphs, setSelectedGraphs] = useState([]);
  const [appliedGraphs, setAppliedGraphs] = useState([]);
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
    successRate: null,
    menuUsage: [],
    priceData: null,
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
    if (!pipelineId) {
      setProcessSpecificData({
        topItems: [],
        successRate: null,
        menuUsage: [],
        priceData: null,
      });
      setSelectedGraphs([]); // 프로세스 선택 해제시 그래프 선택도 초기화
    }
  };

  const updateGraphSelections = (graphs) => {
    setSelectedGraphs(graphs);
  };

  // 데이터 유효성 검사 함수
  const isValidResponse = (response) => {
    return (
      response &&
      response.data &&
      (!Array.isArray(response.data) || response.data.length > 0)
    );
  };

  // 프로세스별 데이터를 로드하는 함수
  const loadProcessSpecificData = async (pipelineId, selectedGraphs) => {
    if (!pipelineId || !selectedGraphs || selectedGraphs.length === 0) return;

    try {
      setIsLoading(true);
      setAppliedGraphs(selectedGraphs);

      const processedData = {
        topItems: [],
        successRate: null,
        menuUsage: [],
        priceData: null,
      };

      // 선택된 그래프에 따라 API 호출
      const responses = await Promise.all(
        selectedGraphs.map(async (graphId) => {
          try {
            let data;
            switch (graphId) {
              case 1: // Barchart (Top 5)
                data = await fetchTop5Items(pipelineId);
                if (isValidResponse({ data })) {
                  const total = data.reduce((sum, item) => sum + item.count, 0);
                  processedData.topItems = data.map((item) => ({
                    item: item.data,
                    visits: item.count,
                    percentage: Number(((item.count / total) * 100).toFixed(1)),
                  }));
                }
                break;
              case 2: // Piechart
                data = await fetchPieChart(pipelineId);
                if (isValidResponse({ data })) {
                  processedData.successRate = data;
                }
                break;
              case 3: // Treemap
                data = await fetchTreemap(pipelineId);
                if (isValidResponse({ data })) {
                  processedData.menuUsage = data;
                }
                break;
              case 4: // Priceboard
                data = await fetchPriceBoard(pipelineId);
                if (isValidResponse({ data })) {
                  processedData.priceData = data;
                }
                break;
            }
          } catch (error) {
            console.error(`Failed to fetch graph ${graphId}:`, error);
          }
        })
      );

      setProcessSpecificData(processedData);
    } catch (error) {
      console.error("Failed to load process specific data:", error);
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
    if (selectedPipeline && selectedGraphs.length > 0) {
      loadProcessSpecificData(selectedPipeline, selectedGraphs);
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
    loadProcessSpecificData,
    selectedGraphs,
    updateGraphSelections,
    appliedGraphs,
  };
};
