import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPipelines = async () => {
  try {
    const response = await api.get("/pipeline/getpipeline");
    return response.data.map((pipeline) => ({
      id: pipeline.id,
      pipelineName: pipeline.pipelinename,
      pipelineId: pipeline.pipelineId,
      status: pipeline.status ? "활성" : "비활성",
      searchCampaignTopic: {
        campaignId: pipeline.searchCampaignTopic?.campaignId,
        campaignName: pipeline.searchCampaignTopic?.campaignName,
      },
    }));
  } catch (error) {
    console.error("Error fetching pipelines:", error);
    throw error;
  }
};

// 캠페인 목록 조회
export const fetchCampaigns = async () => {
  try {
    const response = await api.get("/api/campaigns");
    // 필요한 데이터만 매핑하여 반환
    return response.data.map((campaign) => ({
      id: campaign.campaignId,
      name: campaign.campaignName,
      creator: campaign.author,
    }));
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};

// 포맷 목록 조회
export const fetchFormats = async () => {
  try {
    const response = await api.get("/api/format/management");
    // 필요한 데이터만 매핑하여 반환
    return response.data.map((format) => ({
      id: format.formatId,
      name: format.formatName,
    }));
  } catch (error) {
    console.error("Error fetching formats:", error);
    throw error;
  }
};

// 필터 목록 조회
export const fetchFilters = async () => {
  try {
    const response = await api.get("/api/filter/filtermanagement");
    // 필요한 데이터만 매핑하여 반환
    return response.data.map((filter) => ({
      id: filter.filterManageId,
      name: filter.filterName,
    }));
  } catch (error) {
    console.error("Error fetching filters:", error);
    throw error;
  }
};

//생성
export const createPipeline = async (pipelineData) => {
  try {
    const response = await api.post("/pipeline/addpipeline", pipelineData);
    return response.data;
  } catch (error) {
    console.error("Error creating pipeline:", error);
    throw error;
  }
};

//상세보기
export const fetchPipelineDetail = async (id) => {
  try {
    const response = await api.get(`/pipeline/getpipeline/${id}`);
    console.log("Fetched pipeline detail:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pipeline detail:", error);
    throw error;
  }
};

//실행
export const executePipeline = async (id, executable) => {
  try {
    console.log("Executing pipeline with params:", { id, executable });
    const response = await api.post("/pipeline/processExecutable", {
      id,
      executable,
    });
    console.log("Execute pipeline response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error executing pipeline:", error);
    throw error;
  }
};

//삭제
export const deletePipeline = async (id) => {
  try {
    const response = await api.post("/pipeline/delpipeline", id);
    return response.data;
  } catch (error) {
    console.error("Error deleting pipeline:", error);
    throw error;
  }
};
