import { useState, useEffect, useCallback } from "react";
import {
  fetchLogFiles,
  createLogFormat,
  analyzeLogFile,
  fetchLogFormats,
  analyzeSubFields,
} from "../../api/FormatApi";

const useLogFormat = () => {
  const [logFiles, setLogFiles] = useState([]); // 서버의 로그 파일 목록
  const [selectedFileName, setSelectedFileName] = useState(null); // 선택된 로그 파일 ID
  const [fields, setFields] = useState([]); // 선택된 파일의 필드 정보
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formats, setFormats] = useState([]); // 포맷 목록을 위한 상태 추가

  // 포맷 목록 조회 함수
  const loadFormats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching formats...");
      const formatList = await fetchLogFormats();
      console.log("Received format list:", formatList);
      setFormats(formatList);
    } catch (error) {
      console.error("Failed to fetch formats:", error);
      setError("포맷 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 서버의 로그 파일 목록 조회
  const loadLogFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const files = await fetchLogFiles();
      setLogFiles(files);
    } catch (error) {
      console.error("Failed to fetch log files:", error);
      setError("로그 파일 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 파일 선택 처리
  const selectLogFile = (fileName) => {
    setSelectedFileName(fileName);
    setFields([]); // 필드 초기화
  };

  // 로그 파일 분석 요청
  const analyzeFormat = async (analysisData) => {
    setIsLoading(true);
    setError(null);
    try {
      const fieldData = await analyzeLogFile(analysisData);

      // 백엔드에서 받은 필드 데이터를 테이블에 표시할 형태로 변환
      const initializedFields = fieldData.map((field) => ({
        value: field.value,
        path: field.path,
        hasChild: field.hasChild,
        name: field.name,
        displayName: "",
        description: "",
        type: "STRING",
        // decode: false,
        // split: false,
      }));

      setFields(initializedFields); // 상태 업데이트하여 테이블에 표시
      return initializedFields;
    } catch (error) {
      console.error("Failed to analyze log file:", error);
      setError("로그 파일 분석에 실패했습니다.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 하위 필드 분석 요청 함수 추가
  const analyzeChildFields = async (title, path) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await analyzeSubFields({ title, path });
      return response;
    } catch (error) {
      console.error("Failed to analyze child fields:", error);
      setError("하위 필드 분석에 실패했습니다.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 포맷 생성
  const createFormat = async (formatData) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Original format data:", formatData);
      console.log("Current fields:", fields);

      // 필수 필드 검증
      if (!formatData.name) {
        throw new Error("포맷 이름은 필수입니다.");
      }

      const dataWithFileName = {
        ...formatData,
        fileName: selectedFileName,
        fields: fields.map((field) => {
          if (!field.name) {
            console.warn("Field missing name:", field);
          }
          return {
            ...field,
            name: field.name || "",
            displayName: field.displayName || field.name || "",
            description: field.description || "",
            type: field.type || "STRING",
            value: field.value || "",
            path: field.path || "",
          };
        }),
      };

      console.log("Prepared format data:", dataWithFileName);
      const result = await createLogFormat(dataWithFileName);
      console.log("Format creation result:", result);

      // 성공 시 포맷 목록 새로고침
      await loadFormats();
      return result;
    } catch (error) {
      console.error("Failed to create log format:", error);
      if (error.response?.data) {
        console.error("Server error details:", error.response.data);
      }
      const errorMessage = error.response?.data?.message || error.message;
      setError(`로그 포맷 생성 실패: ${errorMessage}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  //새로운 필드 추가 함수
  const addNewField = (newField) => {
    setFields((currentFields) => [...currentFields, newField]);
  };

  // 필드 업데이트 함수 (테이블에서 사용자 입력값 업데이트)
  const updateField = (index, updates) => {
    if (updates === null) {
      setFields((currentFields) => currentFields.filter((_, i) => i !== index));
    } else {
      setFields((currentFields) => {
        const newFields = [...currentFields];
        newFields[index] = { ...newFields[index], ...updates };
        return newFields;
      });
    }
  };

  // 초기 로딩시 포맷 목록과 로그 파일 목록을 함께 가져오기
  useEffect(() => {
    const loadInitialData = async () => {
      console.log("Loading initial data...");
      try {
        // loadFormats와 loadLogFiles를 순차적으로 실행
        await loadFormats();
        await loadLogFiles();
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    loadInitialData();
  }, [loadFormats, loadLogFiles]);

  return {
    logFiles,
    selectedFileName,
    fields,
    setFields,
    formats,
    isLoading,
    error,
    loadLogFiles,
    loadFormats,
    selectLogFile,
    analyzeFormat,
    analyzeChildFields,
    analyzeSubFields,
    createFormat,
    updateField,
    addNewField,
  };
};

export default useLogFormat;
