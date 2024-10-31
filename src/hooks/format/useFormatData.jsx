import { useState, useEffect, useCallback } from "react";
import {
  fetchLogFiles,
  getLogFileFields,
  createLogFormat,
} from "../../api/FormatApi";

const useLogFormat = () => {
  const [logFiles, setLogFiles] = useState([]); // 서버의 로그 파일 목록
  const [selectedFileId, setSelectedFileId] = useState(null); // 선택된 로그 파일 ID
  const [fields, setFields] = useState([]); // 선택된 파일의 필드 정보
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formats, setFormats] = useState([]); // 빈 배열로 초기화

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

  // 로그 파일 선택 및 필드 정보 조회
  const selectLogFile = async (logFileId) => {
    setIsLoading(true);
    setError(null);
    try {
      setSelectedFileId(logFileId);
      const fieldData = await getLogFileFields(logFileId);

      // 필드 데이터 초기화 (사용자 입력 필드 추가)
      const initializedFields = fieldData.map((field) => ({
        name: field.name, // 서버에서 받은 Field 명
        value: field.value, // 서버에서 받은 Item 컨텐츠 예시
        displayName: "", // 사용자 입력용 빈 값
        description: "", // 사용자 입력용 빈 값
        type: "STRING", // 기본값
        decode: false,
        split: false,
      }));

      setFields(initializedFields);
      return initializedFields;
    } catch (error) {
      console.error("Failed to get log file fields:", error);
      setError("필드 정보를 불러오는데 실패했습니다.");
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
      // 선택된 파일 ID 추가
      const dataWithFileId = {
        ...formatData,
        logFileId: selectedFileId,
        fields: fields.map((field) => ({
          ...field,
          displayName: field.displayName || field.name, // 표시명이 없으면 필드명 사용
        })),
      };

      const result = await createLogFormat(dataWithFileId);
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

  // 필드 업데이트 함수 (테이블에서 사용자 입력값 업데이트)
  const updateField = (index, updates) => {
    setFields((currentFields) => {
      const newFields = [...currentFields];
      newFields[index] = { ...newFields[index], ...updates };
      return newFields;
    });
  };

  return {
    logFiles,
    selectedFileId,
    fields,
    isLoading,
    error,
    loadLogFiles,
    selectLogFile,
    createFormat,
    updateField,
  };
};

export default useLogFormat;
