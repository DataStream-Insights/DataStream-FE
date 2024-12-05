import React, { useState } from "react";
import { Select } from "antd";
import { Plus } from "lucide-react";
import * as S from "../../styles/analytics/dashboardHeader";
import { useGraphSelection } from "../../hooks/analytics/useGraphSelection";
import { useAlert } from "../../context/AlertContext";

const DashboardHeader = ({
  pipelines,
  selectedPipeline,
  onPipelineSelect,
  onApply,
  refreshDashboard,
  selectedGraphs,
  onGraphSelect,
}) => {
  const { showAlert } = useAlert();
  const {
    graphSelections,
    isLoading,
    error,
    getAvailableOptions,
    handleGraphSelect,
    addGraphSelection,
    removeGraphSelection,
    getSelectedGraphs,
  } = useGraphSelection({
    initialGraphs: selectedGraphs,
    onChange: onGraphSelect,
  });

  const handleApply = async () => {
    if (!selectedPipeline) {
      showAlert("프로세스를 선택해주세요.");
      return;
    }

    const selectedGraphs = getSelectedGraphs();
    if (selectedGraphs.length === 0) {
      showAlert("그래프를 선택해주세요.");
      return;
    }

    try {
      onApply(selectedPipeline, selectedGraphs);
    } catch (error) {
      console.error("Failed to apply selections:", error);
      showAlert("그래프 데이터를 불러오는데 실패했습니다.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <S.HeaderContainer>
      <S.ControlsContainer>
        <S.SelectContainer>
          <Select
            style={{ width: 200 }}
            value={selectedPipeline}
            onChange={onPipelineSelect}
            placeholder="프로세스를 선택하세요"
            options={pipelines.map((p) => ({
              value: p.id,
              label: p.pipelineName,
            }))}
          />
        </S.SelectContainer>

        {graphSelections.map((selection) => (
          <S.SelectionGroup key={selection.id}>
            <Select
              style={{ width: 150 }}
              value={selection.selectedGraph}
              onChange={(value) => handleGraphSelect(value, selection.id)}
              placeholder="그래프 선택"
              options={getAvailableOptions(selection.id)}
              loading={isLoading}
            />
            <S.RemoveButton onClick={() => removeGraphSelection(selection.id)}>
              ×
            </S.RemoveButton>
          </S.SelectionGroup>
        ))}

        {graphSelections.length < 4 && (
          <S.AddButton onClick={addGraphSelection}>
            <Plus size={16} />
            그래프 추가
          </S.AddButton>
        )}
      </S.ControlsContainer>

      <S.ApplyButton onClick={handleApply}>적용</S.ApplyButton>
    </S.HeaderContainer>
  );
};

export default DashboardHeader;
