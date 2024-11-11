import React, { useState } from "react";
import LogFormatDetail from "../../components/format/LogFormatDetail";
import LogFormatList from "../../components/format/LogFormatList";
import * as S from "../../styles/format/formatPageStyle";
import useLogFormat from "../../hooks/format/useFormatData";
import { updateLogFormat } from "../../api/FormatApi";

const LogFormatPage = () => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const formatHook = useLogFormat();

  const isDetailVisible = selectedFormat || isCreating;

  const handleFormatSelect = async (format) => {
    try {
      await formatHook.loadFormatDetail(format.id);
      setSelectedFormat(format);
      setIsCreating(false);
    } catch (error) {
      console.error("Failed to load format detail:", error);
    }
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
        await formatHook.createFormat(updatedData);
      } else {
        const formatId = selectedFormat.id;
        await updateLogFormat(formatId, {
          ...updatedData,
          formatID: selectedFormat.formatID,
        });
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
          formats={formatHook.formats}
          onSelect={handleFormatSelect}
          onCreate={handleCreate}
          isDetailVisible={isDetailVisible}
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
