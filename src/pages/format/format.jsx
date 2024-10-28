import React, { useState } from "react";
import LogFormatDetail from "../../components/LogFormatDetail";
import LogFormatList from "../../components/LogFormatList";
import * as S from "../../styles/format/formatPageStyle";

const LogFormatPage = () => {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const isDetailVisible = selectedFormat || isCreating;

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedFormat(null);
    setIsCreating(true);
  };

  const handleClose = () => {
    setSelectedFormat(null);
    setIsCreating(false);
  };

  return (
    <S.Container>
      <S.ListContainer className={!isDetailVisible ? "expanded" : ""}>
        <LogFormatList onSelect={handleFormatSelect} onCreate={handleCreate} />
      </S.ListContainer>
      <S.DetailContainer className={isDetailVisible ? "visible" : ""}>
        <LogFormatDetail
          format={selectedFormat}
          isNew={isCreating}
          onClose={handleClose}
        />
      </S.DetailContainer>
    </S.Container>
  );
};

export default LogFormatPage;
