import { useState, useEffect } from "react";
import { fetchGraphDetail } from "../../api/ProcessApi";

export const useGraphDetail = (id) => {
  const [graphDetails, setGraphDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadGraphDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchGraphDetail(id);
      setGraphDetails(data);
    } catch (err) {
      console.error("Failed to load graph details:", err);
      setError("그래프 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadGraphDetails();
    }
  }, [id]);

  return {
    graphDetails,
    loading,
    error,
    refetch: loadGraphDetails,
  };
};
