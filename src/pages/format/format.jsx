import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LogFormatDetail from "../../components/format/LogFormatDetail";
import LogFormatList from "../../components/format/LogFormatList";
import LogFormatView from "../../components/format/LogFormatView";
import * as S from "../../styles/format/formatPageStyle";
import useLogFormat from "../../hooks/format/useFormatData";
import { updateLogFormat } from "../../api/FormatApi";
import { Layout } from "../../components/Layout";

const LogFormatPage = () => {
  const { campaignId } = useParams();
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
    <Layout>
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
            {isCreating ? (
              <LogFormatDetail
                isNew={true}
                onClose={handleClose}
                onSubmit={handleSubmit}
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
                campaignId={campaignId}
              />
            ) : (
              <LogFormatView
                selectedFormat={formatHook.selectedFormat}
                fields={formatHook.fields}
                onClose={handleClose}
                campaignId={campaignId}
              />
            )}
          </S.DetailContainer>
        )}
      </S.Container>
    </Layout>
  );
};

export default LogFormatPage;
