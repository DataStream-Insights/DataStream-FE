import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 필터 목록 조회 (FilterManagement 화면용)
export const fetchFilters = async () => {
  try {
    const response = await api.get("/filters");
    return response.data;
  } catch (error) {
    console.error("Error fetching filters:", error);
    return [];
  }
};

// 로그 아이템 목록 조회 (LogFilter 화면용)
export const fetchLogItems = async () => {
  try {
    const response = await api.get("/filter/log-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching log items:", error);
    return [];
  }
};

export const fetchFilterOptions = async () => {
  try {
    const response = await api.get("/filters/options");
    return response.data;
    // 예상되는 응답 데이터 형태:
    // {
    //   idOptions: [{ id: "ID1", label: "ID1" }, ...],
    //   operatorOptions: [{ id: "equals", label: "Equals" }, ...],
    //   actionOptions: [{ id: "view_cart", label: "장바구니 보기" }, ...]
    // }
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return {
      idOptions: [],
      operatorOptions: [],
      actionOptions: [],
    };
  }
};

// 필터 생성 (LogFilter 화면용)
export const createLogFilter = async (filterData) => {
  try {
    // 필터 이름이 비어있는지 확인
    if (!filterData.name?.trim()) {
      throw new Error("필터 이름은 필수입니다.");
    }

    const response = await api.post("/filters", filterData);
    return response.data;
  } catch (error) {
    console.error("Error creating filter:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "필터 생성에 실패했습니다."
    );
  }
};
