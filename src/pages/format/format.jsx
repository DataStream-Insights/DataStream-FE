import React, { useState } from "react";
import LogFormatDetail from "../../components/LogFormatDetail";
import LogFormatList from "../../components/LogFormatList";
import * as S from "../../styles/format/formatPageStyle";
import useLogFormat from "../../hooks/format/useFormatData";
import { updateLogFormat } from "../../api/FormatApi";

const LogFormatPage = () => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const formatHook = useLogFormat();

  const isDetailVisible = selectedFormat || isCreating;

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedFormat(null);
    setIsCreating(true);
    formatHook.setFields([]);
  };

  const handleClose = () => {
    setSelectedFormat(null);
    setIsCreating(false);
    formatHook.setFields([]);
  };

  const handleSubmit = async (updatedData) => {
    try {
      if (isCreating) {
        // 새로 생성하는 경우
        await formatHook.createFormat(updatedData);
      } else {
        // 수정하는 경우
        const formatId = selectedFormat.id; // 기존 format의 ID 사용
        await updateLogFormat(formatId, {
          ...updatedData,
          formatID: selectedFormat.formatID, // 기존 formatID 유지
        });
        // 수정 후 목록 새로고침
        await formatHook.loadFormats();
      }
      handleClose();
    } catch (error) {
      console.error("Failed to submit format:", error);
    }
  };

  return (
    <S.Container>
      <S.ListContainer className={!isDetailVisible ? "expanded" : ""}>
        <LogFormatList
          onSelect={handleFormatSelect}
          onCreate={handleCreate}
          isDetailVisible={isDetailVisible}
          formats={formatHook.formats}
          loadFormatDetail={formatHook.loadFormatDetail}
        />
      </S.ListContainer>
      {isDetailVisible && (
        <S.DetailContainer className="visible">
          <LogFormatDetail
            isNew={isCreating}
            onClose={handleClose}
            onSubmit={handleSubmit}
            selectedFormat={formatHook.selectedFormat}
            logFiles={formatHook.logFiles}
            fields={formatHook.fields}
            setFields={formatHook.setFields}
            selectedFileName={formatHook.selectedFileName}
            selectLogFile={formatHook.selectLogFile}
            createFormat={formatHook.createFormat}
            analyzeFormat={formatHook.analyzeFormat}
            analyzeSubFields={formatHook.analyzeSubFields}
            updateField={formatHook.updateField}
            addNewField={formatHook.addNewField}
          />
        </S.DetailContainer>
      )}
    </S.Container>
  );
};

export default LogFormatPage;
