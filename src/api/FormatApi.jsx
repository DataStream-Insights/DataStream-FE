import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 포맷 목록 조회 - 통합 버전
export const fetchLogFormats = async (campaignId = null) => {
  try {
    const endpoint = campaignId
      ? `/format/${campaignId}/management`
      : `/format/management`;
    const response = await api.get(endpoint);
    console.log("Fetched formats:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching log formats:", error);
    throw error;
  }
};

// 포맷 목록 조회
// export const fetchLogFormats = async () => {
//   try {
//     const response = await api.get(`/format/management`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching log formats:", error);
//     throw error;
//   }
// };

// 포맷 목록 조회 - campaignID
// export const fetchLogFormats = async (campaignId) => {
//   try {
//     const response = await api.get(`/format/${campaignId}/management`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching log formats:", error);
//     throw error;
//   }
// };

//상세 정보 조회
export const fetchFormatDetail = async (campaignId, formatId) => {
  try {
    const endpoint = campaignId
      ? `/format/${campaignId}/management/${formatId}`
      : `/format/management/${formatId}`;

    console.log(`Fetching format detail - Endpoint: ${endpoint}`);
    const response = await api.get(endpoint);

    if (!response.data) {
      throw new Error("No data received from server");
    }

    const { start, end, formatname, formatID, formatexplain, formatSets } =
      response.data;

    // 빈 값이나 null 체크를 추가하여 데이터 정제
    const validFormatSets = formatSets.filter((set) => {
      const itemResponse = set.formatItemResponse;
      return (
        itemResponse &&
        (itemResponse.fieldName ||
          itemResponse.itemAlias ||
          itemResponse.itemExplain ||
          itemResponse.itemContent)
      );
    });

    // 정제된 데이터로 response 객체 재구성
    const cleanedResponse = {
      start,
      end,
      formatname,
      formatID,
      formatexplain,
      formatSets: validFormatSets,
    };

    console.log("Cleaned format detail:", cleanedResponse);
    return cleanedResponse;
  } catch (error) {
    console.error("Error fetching format detail:", error);
    throw error;
  }
};

//수정
export const updateLogFormat = async (id, formatData) => {
  try {
    console.log("Updating format with ID:", id, formatData);

    // 서버 요구사항에 맞는 DTO 구조
    const logFormatDTO = {
      start: parseInt(formatData.startOffset) || 0,
      end: parseInt(formatData.endOffset) || 0,
      formatname: formatData.name,
      formatID: formatData.formatID, // 기존 ID 유지
      formatexplain: formatData.description || "",
      formatSets: formatData.fields.map((field) => ({
        formatItemResponse: {
          fieldName: field.name || "",
          itemAlias: field.displayName || field.name || "",
          itemExplain: field.description || "",
          itemType: field.type || "STRING",
          itemContent: field.value ? field.value.replace(/^"|"$/g, "") : "",
          path: field.path || "",
        },
      })),
    };

    console.log(
      "Update request payload:",
      JSON.stringify(logFormatDTO, null, 2)
    );

    // PUT 요청으로 변경
    // const response = await api.put(
    //   `/format/management/addformatfields`,
    //   logFormatDTO
    // );
    console.log("Update response:", response);

    return response.data;
  } catch (error) {
    console.error("Error updating log format:", error);
    if (error.response) {
      console.error("Server error response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    }
    throw error;
  }
};

// 서버에 있는 로그 파일 목록 조회
export const fetchLogFiles = async () => {
  try {
    const response = await api.get("/format/gettitle");
    // id 필요 없고 name만 있으면 됨
    // ["log1.txt", "log2.txt", ...]
    return response.data;
  } catch (error) {
    console.error("Error fetching log files:", error);
    return [];
  }
};

// 선택한 로그 파일의 필드 분석 요청
export const analyzeLogFile = async (analysisData) => {
  try {
    const response = await api.post("/format/analyze", {
      title: analysisData.fileName,
      startdepth: analysisData.startOffset,
      enddepth: analysisData.startOffset,
    });
    console.log("서버 응답 데이터:", response.data);
    return response.data; // [{name: "HTTP_USER_AGENT", value: "Mozilla/5.0..."}, ...]
  } catch (error) {
    console.error("Error analyzing log file:", error);
    throw error;
  }
};

// 하위 필드 분석을 위한 새로운 API 추가
export const analyzeSubFields = async (analysisData) => {
  try {
    const response = await api.post("/format/analyze/search", {
      title: analysisData.title,
      path: analysisData.path,
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing sub fields:", error);
    throw error;
  }
};

// 포맷 생성 - 통합 버전
export const createLogFormat = async (campaignId = null, formatData) => {
  try {
    console.log("Creating format with data:", formatData);

    const logFormatDTO = {
      start: parseInt(formatData.startOffset) || 0,
      end: parseInt(formatData.endOffset) || 0,
      formatname: formatData.name,
      formatID: generateFormatId(),
      formatexplain: formatData.description || "",
      formatSets: formatData.fields.map((field) => ({
        formatItemResponse: {
          fieldName: field.name,
          itemAlias: field.displayName || field.name,
          itemExplain: field.description || "",
          itemType: field.type || "STRING",
          itemContent: field.value,
          path: field.path,
        },
      })),
    };

    const endpoint = campaignId
      ? `/format/${campaignId}/addformatfields`
      : `/format/addformatfields`;

    const response = await api.post(endpoint, logFormatDTO);
    console.log("Format creation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating log format:", error);
    throw error;
  }
};

// 로그 포맷 생성
// export const createLogFormat = async (formatData) => {
//   try {
//     console.log("Received format data:", formatData);

//     // 필수 필드 검증
//     if (!formatData.name) {
//       throw new Error("Format name is required");
//     }

//     const logFormatDTO = {
//       start: parseInt(formatData.startOffset) || 0,
//       end: parseInt(formatData.endOffset) || 0,
//       formatname: formatData.name,
//       formatID: generateFormatId(),
//       formatexplain: formatData.description || "",
//       formatSets: formatData.fields.map((field) => ({
//         formatItemResponse: {
//           fieldName: field.name || "",
//           itemAlias: field.displayName || field.name || "",
//           itemExplain: field.description || "",
//           itemType: field.type || "STRING",
//           itemContent: field.value ? field.value.replace(/^"|"$/g, "") : "",
//           path: field.path || "",
//         },
//       })),
//     };

//     const response = await api.post(`/format/addformatfields`, logFormatDTO);
//     console.log("Server response:", response);

//     return response.data;
//   } catch (error) {
//     console.error("Error creating log format:", error);
//     if (error.response) {
//       console.error("Server error response:", {
//         status: error.response.status,
//         data: error.response.data,
//         headers: error.response.headers,
//       });
//     }
//     throw error;
//   }
// };

// export const createLogFormat = async (campaignId, formatData) => {
//   try {
//     console.log("Received format data:", campaignId, formatData);

//     // 필수 필드 검증
//     if (!formatData.name) {
//       throw new Error("Format name is required");
//     }

//     const logFormatDTO = {
//       start: parseInt(formatData.startOffset) || 0,
//       end: parseInt(formatData.endOffset) || 0,
//       formatname: formatData.name,
//       formatID: generateFormatId(),
//       formatexplain: formatData.description || "",
//       formatSets: formatData.fields.map((field) => ({
//         formatItemResponse: {
//           fieldName: field.name || "",
//           itemAlias: field.displayName || field.name || "",
//           itemExplain: field.description || "",
//           itemType: field.type || "STRING",
//           itemContent: field.value ? field.value.replace(/^"|"$/g, "") : "",
//           path: field.path || "",
//         },
//       })),
//     };

//     const response = await api.post(
//       `/format/${campaignId}/addformatfields`,
//       logFormatDTO
//     );
//     console.log("Server response:", response);

//     return response.data;
//   } catch (error) {
//     console.error("Error creating log format:", error);
//     if (error.response) {
//       console.error("Server error response:", {
//         status: error.response.status,
//         data: error.response.data,
//         headers: error.response.headers,
//       });
//     }
//     throw error;
//   }
// };

// formatSets 배열을 올바른 형식으로 생성하는 헬퍼 함수
export const createFormatSets = (fields) => {
  if (!Array.isArray(fields)) {
    console.warn("Fields is not an array:", fields);
    return [];
  }

  return fields.map((field) => ({
    fieldName: field.name || "",
    itemAlias: field.displayName || field.name || "",
    itemExplain: field.description || "",
    itemType: field.type || "STRING",
    itemContent: field.value || "",
    path: field.path || "",
  }));
};

// ID 생성 함수
const generateFormatId = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `FMT${year}${month}${day}${random}`;
};
