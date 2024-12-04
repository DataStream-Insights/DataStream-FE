import React, { useState } from "react";
import { Select } from "antd";
import { Plus } from "lucide-react";
import * as S from "../../styles/analytics/dashboardHeader";
import { useGraphSelection } from "../../hooks/analytics/useGraphSelection";

const DashboardHeader = ({ pipelines, selectedPipeline, onPipelineSelect }) => {
  const {
    graphSelections,
    isLoading,
    error,
    getAvailableOptions,
    handleGraphSelect,
    addGraphSelection,
    removeGraphSelection,
    getSelectedGraphs,
  } = useGraphSelection();

  const handleApply = () => {
    const selectedProcess = pipelines.find((p) => p.id === selectedPipeline);
    const selectedGraphs = getSelectedGraphs();

    // 선택된 정보 출력
    console.log("Selected Process:", {
      id: selectedProcess?.id,
      name: selectedProcess?.pipelineName,
    });
    console.log("Selected Graph IDs:", selectedGraphs);
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
