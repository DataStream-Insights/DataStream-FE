import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchGraphList = async () => {
  try {
    const response = await api.get("/pipeline/graphList");
    return response.data.map((graph) => ({
      id: graph.id,
      name: graph.graph_name,
    }));
  } catch (error) {
    console.error("Error fetching graph list:", error);
    throw error;
  }
};

// 향후 추가될 그래프 관련 API 호출들을 위한 자리
export const submitGraphSelections = async (processId, graphIds) => {
  // 백엔드 API가 준비되면 여기에 POST 요청 구현
  console.log("Process ID:", processId);
  console.log("Selected Graph IDs:", graphIds);
};
