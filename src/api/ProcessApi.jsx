import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 캠페인 목록 조회
export const fetchCampaigns = async () => {
  try {
    const response = await api.get("/campaigns");
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
    const response = await api.get("/format/management");
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
    const response = await api.get("/filter/filtermanagement");
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
