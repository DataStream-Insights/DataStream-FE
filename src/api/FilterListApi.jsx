import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 필터 목록 조회
export const fetchFilters = async () => {
  try {
    const response = await api.get("/filters");
    // 응답 데이터에 no 필드 추가
    const filtersWithNo = response.data.map((filter, index) => ({
      ...filter,
      no: index + 1, //테이블 행 번호
    }));
    return filtersWithNo;
  } catch (error) {
    console.error("Error fetching filters:", error);
    return [];
  }
};
