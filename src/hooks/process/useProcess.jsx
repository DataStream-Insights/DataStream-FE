import { useState, useEffect } from "react";
import {
  fetchCampaigns,
  fetchFormats,
  fetchFilters,
  fetchPipelines,
  createPipeline,
  fetchPipelineDetail,
  fetchGraphs,
} from "../../api/ProcessApi";

const useProcess = () => {
  const [pipelines, setPipelines] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [formats, setFormats] = useState([]);
  const [filters, setFilters] = useState([]);
  const [graphs, setGraphs] = useState([]);
  const [loading, setLoading] = useState({
    pipelines: false,
    campaigns: false,
    formats: false,
    filters: false,
    graphs: false,
  });
  const [error, setError] = useState({
    pipelines: null,
    campaigns: null,
    formats: null,
    filters: null,
    graphs: null,
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [unavailableCampaigns, setUnavailableCampaigns] = useState(new Set());

  //프로세스(파이프라인) 목록
  // 파이프라인 목록 로드할 때 사용된 캠페인 ID들 수집
  const loadPipelines = async () => {
    setLoading((prev) => ({ ...prev, pipelines: true }));
    try {
      const pipelinesData = await fetchPipelines();
      setPipelines(pipelinesData);

      // 각 파이프라인의 상세 정보를 가져옵니다
      const detailsPromises = pipelinesData.map((pipeline) =>
        fetchPipelineDetail(pipeline.id)
      );
      const detailsResponses = await Promise.all(detailsPromises);

      // 사용 중인 캠페인 ID 수집
      const usedCampaignIds = new Set(
        detailsResponses
          .map((response) => response?.searchCampaignTopic?.campaignId)
          .filter(Boolean)
      );

      setUnavailableCampaigns(usedCampaignIds);
    } catch (err) {
      console.error("Failed to load pipelines:", err);
      setError((prev) => ({
        ...prev,
        pipelines: "파이프라인 목록을 불러오는데 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, pipelines: false }));
    }
  };

  // 캠페인 목록 로드
  const loadCampaigns = async () => {
    setLoading((prev) => ({ ...prev, campaigns: true }));
    try {
      const campaignsData = await fetchCampaigns();

      // unavailableCampaigns를 사용하여 사용 가능한 캠페인만 필터링
      const availableCampaigns = campaignsData.filter(
        (campaign) => !unavailableCampaigns.has(campaign.id)
      );

      setCampaigns(availableCampaigns);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
      setError((prev) => ({
        ...prev,
        campaigns: "캠페인 목록을 불러오는데 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, campaigns: false }));
    }
  };

  // 포맷 목록 로드
  const loadFormats = async () => {
    setLoading((prev) => ({ ...prev, formats: true }));
    try {
      const data = await fetchFormats();
      setFormats(data);
    } catch (err) {
      console.error("Failed to load formats:", err);
      setError((prev) => ({
        ...prev,
        formats: "포맷 목록을 불러오는데 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, formats: false }));
    }
  };

  // 필터 목록 로드
  const loadFilters = async () => {
    setLoading((prev) => ({ ...prev, filters: true }));
    try {
      const data = await fetchFilters();
      setFilters(data);
    } catch (err) {
      console.error("Failed to load filters:", err);
      setError((prev) => ({
        ...prev,
        filters: "필터 목록을 불러오는데 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, filters: false }));
    }
  };

  // 그래프 목록 로드
  const loadGraphs = async () => {
    setLoading((prev) => ({ ...prev, graphs: true }));
    try {
      const data = await fetchGraphs();
      setGraphs(data);
    } catch (err) {
      console.error("Failed to load graphs:", err);
      setError((prev) => ({
        ...prev,
        graphs: "그래프 목록을 불러오는데 실패했습니다.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, graphs: false }));
    }
  };

  //생성
  const handleCreatePipeline = async (pipelineData) => {
    setCreateLoading(true);
    setCreateError(null);
    try {
      const result = await createPipeline(pipelineData);
      loadPipelines(); // 생성 후 목록 새로고침
      return result;
    } catch (err) {
      console.error("Failed to create pipeline:", err);
      setCreateError("파이프라인 생성에 실패했습니다.");
      throw err;
    } finally {
      setCreateLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadPipelines();
    loadCampaigns();
    loadFormats();
    loadFilters();
    loadGraphs();
  }, []);

  // 각 목록 리로드 함수
  const reloadData = {
    pipelines: loadPipelines,
    campaigns: loadCampaigns,
    formats: loadFormats,
    filters: loadFilters,
    graphs: loadGraphs,
  };

  return {
    data: {
      pipelines,
      campaigns: campaigns.filter(
        (campaign) => !unavailableCampaigns.has(campaign.id)
      ),
      formats,
      filters,
      graphs,
    },
    loading: {
      ...loading,
      create: createLoading,
    },
    error: {
      ...error,
      create: createError,
    },
    reloadData,
    createPipeline: handleCreatePipeline,
  };
};

export default useProcess;
