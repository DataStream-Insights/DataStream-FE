import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//목록
export const fetchProcesses = async () => {
  try {
    const response = await api.get("/dashboard/processes");
    return response.data.map((pipeline) => ({
      id: pipeline.id,
      pipelineName: pipeline.name,
    }));
  } catch (error) {
    console.error("Error fetching pipelines:", error);
    throw error;
  }
};

//방문 시간대
export const fetchTimeRangeData = async () => {
  try {
    const response = await api.get(
      `/dashboard/processes/dategraph/datetimerrangeandcount`
    );
    console.log(response.data);
    const transformedData = response.data.map((item) => ({
      hour: item.timeRange.split("-")[0], // "00:00-00:59" -> "00:00"
      방문: item.count,
    }));
    console.log(transformedData);
    return transformedData;
  } catch (error) {
    throw handleApiError(error);
  }
};

//상품 top5
// export const fetchTop5Items = async (processId) => {
//   try {
//     const response = await api.get(`/dashboard/Barchart/${processId}`);
//     console.log("fetchTop5Items response:", response.data);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // 서버가 응답을 반환한 경우 (400, 401, 403, 404, 500 등)
//       throw {
//         status: error.response.status,
//         message: error.response.data.message || "서버 오류가 발생했습니다.",
//         details: error.response.data,
//       };
//     } else if (error.request) {
//       // 요청은 보냈지만 응답을 받지 못한 경우
//       throw {
//         status: 0,
//         message: "서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.",
//         details: error.request,
//       };
//     } else {
//       // 요청 설정 중에 오류가 발생한 경우
//       throw {
//         status: 0,
//         message: "요청 중 오류가 발생했습니다.",
//         details: error.message,
//       };
//     }
//   }
// };

//날짜별
export const fetchDailyVisits = async () => {
  try {
    const response = await api.get(
      `/dashboard/processes/dategraph/countByDate`
    );
    return response.data.map((item) => ({
      date: item.date,
      visits: item.count,
    }));
  } catch (error) {
    throw handleApiError(error);
  }
};

//요일별
export const fetchDayVisits = async () => {
  try {
    const response = await api.get(`/dashboard/processes/dategraph/dayvisit`);

    console.log(response.data);
    // 한글 요일 매핑
    const koreanDays = {
      Monday: "월요일",
      Tuesday: "화요일",
      Wednesday: "수요일",
      Thursday: "목요일",
      Friday: "금요일",
      Saturday: "토요일",
      Sunday: "일요일",
    };

    // 데이터 변환 및 한글화
    const transformedData = response.data.map((item) => ({
      day: koreanDays[item.day], // 영어 요일을 한글로 변환
      visits: item.count, // count를 visits로 이름 변경
    }));

    console.log("Transformed day visits data:", transformedData); // 변환된 데이터 로깅
    return transformedData;
  } catch (error) {
    throw handleApiError(error);
  }
};

//특정요일 시간대별
export const fetchDateTimeRange = async (date) => {
  try {
    const response = await api.get(
      `/dashboard/processes/dategraph/datetimerrangeandcount/${date}`
    );
    const transformedData = response.data.map((item) => ({
      hour: item.timeRange.split("-")[0], // "00:00-00:59" -> "00:00"
      count: item.count,
    }));
    return transformedData;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchTop5Items = async (processId) => {
  try {
    const response = await api.get(`/dashboard/Barchart/${processId}`);
    console.log("Top5Items raw response:", response.data);

    if (!response.data?.barchartDTOs) return null;

    const total = response.data.barchartDTOs.reduce(
      (sum, item) => sum + item.count,
      0
    );
    return response.data.barchartDTOs.map((item) => ({
      item: item.data,
      visits: item.count,
      percentage: Number(((item.count / total) * 100).toFixed(1)),
    }));
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const fetchPieChart = async (processId) => {
  try {
    const response = await api.get(`/dashboard/Piechart/${processId}`);
    console.log("Piechart raw response:", response.data);

    if (!response.data?.piechartDTO) return null;

    const { success, failure } = response.data.piechartDTO;
    return {
      success,
      failure,
      totalCount: success + failure,
    };
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const fetchTreemap = async (processId) => {
  try {
    const response = await api.get(`/dashboard/Treemap/${processId}`);
    console.log("Treemap raw response:", response.data);

    if (!response.data?.treemaps) return [];

    const transformedData = response.data.treemaps.map((item) => ({
      name: item.name,
      value: item.value,
    }));

    const total = transformedData.reduce((sum, item) => sum + item.value, 0);
    return transformedData.map((item) => ({
      ...item,
      percent: Number(((item.value / total) * 100).toFixed(1)),
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const fetchPriceBoard = async (processId) => {
  try {
    const response = await api.get(`/dashboard/Priceboard/${processId}`);
    console.log("Priceboard raw response:", response.data);

    if (!response.data?.priceboardDTO) return null;

    const { averageValue, minValue, maxValue } = response.data.priceboardDTO;
    return {
      average: averageValue,
      min: minValue,
      max: maxValue,
    };
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 공통 에러 처리 함수
const handleApiError = (error) => {
  if (error.response) {
    throw {
      status: error.response.status,
      message: error.response.data.message || "서버 오류가 발생했습니다.",
      details: error.response.data,
    };
  } else if (error.request) {
    throw {
      status: 0,
      message: "서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.",
      details: error.request,
    };
  } else {
    throw {
      status: 0,
      message: "요청 중 오류가 발생했습니다.",
      details: error.message,
    };
  }
};
