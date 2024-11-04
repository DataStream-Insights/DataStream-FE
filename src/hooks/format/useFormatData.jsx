import { useState, useEffect, useCallback } from "react";
import {
  fetchLogFiles,
  createLogFormat,
  analyzeLogFile,
} from "../../api/FormatApi";

const useLogFormat = () => {
  const [logFiles, setLogFiles] = useState([]); // 서버의 로그 파일 목록
  const [selectedFileName, setSelectedFileName] = useState(null); // 선택된 로그 파일 ID
  const [fields, setFields] = useState([]); // 선택된 파일의 필드 정보
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        name: field.name,
        value: field.value,
        displayName: "",
        description: "",
        type: "STRING",
        decode: false,
        split: false,
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

  // 포맷 생성
  const createFormat = async (formatData) => {
    setIsLoading(true);
    setError(null);
    try {
      const dataWithFileName = {
        ...formatData,
        fileName: selectedFileName,
        fields: fields.map((field) => ({
          ...field,
          displayName: field.displayName || field.name, // 표시명이 없으면 필드명 사용
        })),
      };

      const result = await createLogFormat(dataWithFileName);
      return result;
    } catch (error) {
      console.error("Failed to create log format:", error);
      setError("로그 포맷 생성에 실패했습니다.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로그 파일 목록 로딩
  useEffect(() => {
    loadLogFiles();
  }, [loadLogFiles]);

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

  return {
    logFiles,
    selectedFileName,
    fields,
    isLoading,
    error,
    loadLogFiles,
    selectLogFile,
    analyzeFormat,
    createFormat,
    updateField,
    addNewField,
  };
};

export default useLogFormat;
