import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 필터 목록 조회 (통합 버전)
export const fetchFilters = async (campaignId = null, formatId = null) => {
  try {
    let endpoint;
    if (campaignId && formatId) {
      endpoint = `/filter/${campaignId}/${formatId}/filtermanagement`;
    } else {
      endpoint = `/filter/filtermanagement`;
    }

    console.log("Fetching filters from endpoint:", endpoint);
    const response = await api.get(endpoint);
    console.log("Filter response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching filters:", error);
    return [];
  }
};

//상세보기 (통합 버전)
export const fetchFilterDetail = async (
  campaignId = null,
  formatId = null,
  id
) => {
  try {
    if (!id) throw new Error("Filter ID is required");

    let endpoint;
    if (campaignId && formatId) {
      endpoint = `/filter/${campaignId}/${formatId}/filtermanagement/${id}`;
    } else {
      endpoint = `/filter/filtermanagement/${id}`;
    }

    console.log("Calling API for filter detail:", {
      campaignId,
      formatId,
      id,
      endpoint,
    });
    const response = await api.get(endpoint);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching filter detail:", error);
    if (error.response) {
      console.error("Error response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    throw error;
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
    console.log("Fetching filter options...");
    const response = await api.get("/filter/options");
    console.log("Filter options response:", response.data);
    return response.data;
    // 예상되는 응답 데이터 형태:
    // {
    //   idOptions: [{ id: "ID1", label: "ID1" }, ...],
    //   operatorOptions: [{ id: "equals", label: "Equals" }, ...],
    //   actionOptions: [{ id: "view_cart", label: "장바구니 보기" }, ...]
    // }
  } catch (error) {
    console.error("Error fetching filter options:", error);
    if (error.response) {
      console.error("Error response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    return {
      idOptions: [],
      operatorOptions: [],
    };
  }
};

// 로그 필터 생성 (통합 버전)
export const createLogFilter = async (
  campaignId = null,
  formatId = null,
  filterData
) => {
  try {
    if (!filterData.filtername?.trim()) {
      throw new Error("필터 이름은 필수입니다.");
    }

    let endpoint;
    if (campaignId && formatId) {
      endpoint = `/filter/${campaignId}/${formatId}/savefilter`;
    } else {
      endpoint = `/filter/savefilter`;
    }

    const response = await api.post(endpoint, filterData);
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
