import { useState, useEffect } from "react";
import {
  fetchCampaigns,
  fetchFormats,
  fetchFilters,
} from "../../api/ProcessApi";

const useProcess = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formats, setFormats] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState({
    campaigns: false,
    formats: false,
    filters: false,
  });
  const [error, setError] = useState({
    campaigns: null,
    formats: null,
    filters: null,
  });

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

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadCampaigns();
    loadFormats();
    loadFilters();
  }, []);

  // 각 목록 리로드 함수
  const reloadData = {
    campaigns: loadCampaigns,
    formats: loadFormats,
    filters: loadFilters,
  };

  return {
    data: {
      campaigns,
      formats,
      filters,
    },
    loading,
    error,
    reloadData,
  };
};

export default useProcess;
