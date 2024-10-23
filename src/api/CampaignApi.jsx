import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

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
    // DTO 형식에 맞게 데이터 변환
    const campaignDTO = {
      campaignId: generateCampaignId(),
      category1: formData.campaignClassification1,
      category2: formData.campaignClassification2,
      campaignName: formData.campaignName,
      status: "DRAFT",
      startDate: formData.startDate,
      endDate: formData.endDate,
      isPublic: formData.visibility,
      department: "테스트부서", // 임시값
      author: "테스트작성자", // 임시값
      createdDate: new Date().toISOString().split("T")[0],
    };
    console.log("Sending data to server:", campaignDTO); //데이터 확인용
    const response = await api.post("/campaigns", campaignDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

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

export const useCategoryData = () => {
  const [categories, setCategories] = useState({
    category1: [],
    category2: []
  });
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories'); // api 인스턴스 사용
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error);
      }
    };
    fetchCategories();
  }, []);

  return { categories, error };
};