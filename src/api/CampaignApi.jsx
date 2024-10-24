import axios from "axios";

// 공통 axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//캠페인 목록 get으로 불러오기
export const fetchCampaignData = async () => {
  try {
    //http://localhost:8080/api/campaigns
    const response = await api.get("/campaigns");
    return response.data;
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    return [];
  }
};

//폼 작성 후 post
export const createCampaignData = async (formData) => {
  try {
    console.log("FormData received:", formData);

    const campaignDTO = {
      campaignId: generateCampaignId(), //생성한 ID 값
      campaignClassification1: formData.campaignClassification1,
      campaignClassification2: formData.campaignClassification2,
      campaignName: formData.campaignName,
      customerType: formData.customerType,
      status: "DRAFT",
      campaignDescription: formData.campaignDescription,
      startDate: formData.startDate,
      endDate: formData.endDate,
      endAfter: parseInt(formData.endAfter),
      visibility: formData.visibility,
      department: 1, // 임시값 - 수정 필요
      author: 1, // 임시값 - 수정 필요
      createdDate: new Date().toISOString().split("T")[0],
      tags: formData.tags,
    };

    console.log("Sending data to server:", campaignDTO);

    const response = await api.post("/campaigns/add", campaignDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

// 카테고리
export const categoryAPI = {
  // Category1 목록 조회
  async getCategory1List() {
    try {
      const response = await api.get("/categories/category1");
      return response.data;
    } catch (error) {
      console.error("Error in getCategory1List:", error);
      throw error;
    }
  },

  // Category2 목록 조회
  // 카테고리 1의 하위 카테고리 조회(카테고리 2)
  async getCategory2List(category1Id) {
    try {
      if (!category1Id) return [];
      const response = await api.get(`/categories/category2/${category1Id}`);
      return response.data;
    } catch (error) {
      console.error("Error in getCategory2List:", error);
      throw error;
    }
  },
};

//날짜를 받아와 랜덤한 ID를 생성
//폼 작성하면 아이디 값 생성 후 부여
const generateCampaignId = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  //ID
  return `CPG${year}${month}${day}${random}`;
};
