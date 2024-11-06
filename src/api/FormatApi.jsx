import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 포맷 목록 조회 API 추가
export const fetchLogFormats = async () => {
  try {
    const response = await api.get("/format/management");
    return response.data;
  } catch (error) {
    console.error("Error fetching log formats:", error);
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

// 로그 포맷 생성
export const createLogFormat = async (formatData) => {
  try {
    console.log("Creating format:", formatData);

    const logFormatDTO = {
      start: formatData.startOffset,
      end: formatData.endOffset,
      formatname: formatData.name,
      formatId: generateFormatId(),
      formatexplain: formatData.description,
      //title: formatData.fileName, //파일 이름
      formatSets: [
        // 배열로 감싸기
        {
          formatItemResponse: formatData.fields.map((field) => ({
            fieldName: field.name,
            itemAlias: field.displayName,
            itemExplain: field.description,
            itemType: field.type,
            itemContent: field.value,
            path: field.path,
          })),
        },
      ],
    };

    const response = await api.post("/format/addformatfields", logFormatDTO);
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
