import axios from "axios";
import { useState, useEffect } from "react";

// 공통 axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// 캠페인 관련 API 함수들
export const fetchCampaignData = async () => {
  try {
    const response = await api.get("/campaigns");
    return response.data;
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    return [];
  }
};

export const createCampaignData = async (formData) => {
  try {
      console.log("FormData received:", formData);

    const campaignDTO = JSON.stringify({
      campaignId: generateCampaignId(),
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
      department: 1, // 임시값
      author: 1, // 임시값
      createdDate: new Date().toISOString().split("T")[0],
      tags: formData.tags,
    });
    console.log("Sending data to server:", campaignDTO);
    console.log(api.post("/campaigns/add"));
    const response = await api.post("/campaigns/add", campaignDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

// 카테고리 관련 API 함수들
export const categoryAPI = {
  // Category1 목록 조회
  async getCategory1List() {
    try {
      const response = await api.get('/categories/category1');
      return response.data;
    } catch (error) {
      console.error('Error in getCategory1List:', error);
      throw error;
    }
  },

  // Category2 목록 조회
  async getCategory2List(category1Id) {
    try {
      if (!category1Id) return [];
      const response = await api.get(`/categories/category2/${category1Id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getCategory2List:', error);
      throw error;
    }
  }
};

// 유틸리티 함수들
const generateCampaignId = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `CPG${year}${month}${day}${random}`;
};

const convertVisibilityToIsPublic = (visibility) => {
  const visibilityMap = {
    public: "PUBLIC",
    department: "DEPARTMENT",
    private: "PRIVATE",
  };
  return visibilityMap[visibility] || "PRIVATE";
};

// 카테고리 데이터를 관리하는 커스텀 훅
// export const useCategoryData = () => {
//   const [categories, setCategories] = useState({
//     category1: [],
//     category2: []
//   });
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const category1Data = await categoryAPI.getCategory1List();
//         setCategories(prev => ({
//           ...prev,
//           category1: category1Data
//         }));
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setError(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return { categories, error };
// };