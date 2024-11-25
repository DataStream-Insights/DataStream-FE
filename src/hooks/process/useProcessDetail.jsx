import { useState, useEffect, useCallback } from "react";
import { fetchPipelineDetail } from "../../api/ProcessApi";

const useProcessDetail = (pipelineId) => {
  const [pipelineDetail, setPipelineDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPipelineDetail = useCallback(async () => {
    if (!pipelineId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchPipelineDetail(pipelineId);
      setPipelineDetail(data);
      return data;
    } catch (err) {
      console.error("Failed to load pipeline detail:", err);
      setError("파이프라인 상세 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [pipelineId]);

  useEffect(() => {
    loadPipelineDetail();
  }, [loadPipelineDetail]);

  return { pipelineDetail, loading, error, refetch: loadPipelineDetail };
};

export default useProcessDetail;
