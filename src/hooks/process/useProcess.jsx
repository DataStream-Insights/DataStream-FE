import { useState, useEffect } from "react";
import {
  fetchCampaigns,
  fetchFormats,
  fetchFilters,
  fetchPipelines,
  createPipeline,
} from "../../api/ProcessApi";

const useProcess = () => {
  const [pipelines, setPipelines] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [formats, setFormats] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState({
    pipelines: false,
    campaigns: false,
    formats: false,
    filters: false,
  });
  const [error, setError] = useState({
    pipelines: null,
    campaigns: null,
    formats: null,
    filters: null,
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  //프로세스(파이프라인) 목록
  const loadPipelines = async () => {
    setLoading((prev) => ({ ...prev, pipelines: true }));
    try {
      const data = await fetchPipelines();
      setPipelines(data);
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
      const data = await fetchCampaigns();
      setCampaigns(data);
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
  }, []);

  // 각 목록 리로드 함수
  const reloadData = {
    pipelines: loadPipelines,
    campaigns: loadCampaigns,
    formats: loadFormats,
    filters: loadFilters,
  };

  return {
    data: {
      pipelines,
      campaigns,
      formats,
      filters,
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
