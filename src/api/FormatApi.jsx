import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 서버에 있는 로그 파일 목록 조회
export const fetchLogFiles = async () => {
  try {
    const response = await api.get("/logs/files");
    // [{id: "1", name: "log1.txt"}, {id: "2", name: "log2.txt"}]
    return response.data;
  } catch (error) {
    console.error("Error fetching log files:", error);
    return [];
  }
};

export const getLogFileFields = async (logFileId) => {
  try {
    const response = await api.get(`/logs/files/${logFileId}/fields`);
    return response.data; // [{name: "HTTP_USER_AGENT", value: "Mozilla/5.0..."}, ...]
  } catch (error) {
    console.error("Error getting log file fields:", error);
    throw error;
  }
};

// 로그 포맷 생성
export const createLogFormat = async (formatData) => {
  try {
    console.log("Creating format:", formatData);

    const logFormatDTO = {
      id: generateFormatId(),
      name: formatData.name,
      description: formatData.description,
      logFileId: formatData.logFileId, // 선택한 로그 파일 ID
      fileFormat: formatData.fileFormat,
      logSubstring: {
        type: formatData.substringType,
        start: {
          type: formatData.startType,
          value: formatData.startValue,
          offset: formatData.startOffset,
        },
        end: {
          type: formatData.endType,
          value: formatData.endValue,
          offset: formatData.endOffset,
        },
      },
      fields: formatData.fields.map((field) => ({
        name: field.name, // 스프링에서 받은 필드명
        displayName: field.displayName, // 사용자가 입력한 표시명
        description: field.description, // 사용자가 입력한 설명
        type: field.type, // 사용자가 선택한 타입
        value: field.value, // 스프링에서 받은 예시값
        decode: field.decode || false,
        split: field.split || false,
      })),
    };

    const response = await api.post("/log-formats/create", logFormatDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating log format:", error);
    throw error;
  }
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

// 선택한 로그 파일의 필드 분석 요청
// export const analyzeLogFields = async (logFileId, formatSettings) => {
//   try {
//     const requestData = {
//       logFileId,
//       fileFormat: formatSettings.fileFormat,
//       logSubstring: {
//         type: formatSettings.substringType,
//         start: {
//           type: formatSettings.startType,
//           value: formatSettings.startValue,
//           offset: formatSettings.startOffset,
//         },
//         end: {
//           type: formatSettings.endType,
//           value: formatSettings.endValue,
//           offset: formatSettings.endOffset,
//         },
//       },
//     };

//     const response = await api.post("/log-formats/analyze", requestData);
//     return response.data; // { fields: [{ name: "필드명", value: "예시값" }, ...] }
//   } catch (error) {
//     console.error("Error analyzing log fields:", error);
//     throw error;
//   }
// };
