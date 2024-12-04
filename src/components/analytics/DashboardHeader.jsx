import React, { useState } from "react";
import { Select } from "antd";
import { Plus } from "lucide-react";
import * as S from "../../styles/analytics/dashboardHeader";

const GRAPH_OPTIONS = [
  { value: "barchart", label: "Bar Chart" },
  { value: "piechart", label: "Pie Chart" },
  { value: "treemap", label: "Tree Map" },
  { value: "priceboard", label: "Price Board" },
];

const DashboardHeader = ({ pipelines, selectedPipeline, onPipelineSelect }) => {
  const [graphSelections, setGraphSelections] = useState([
    // { id: 1, selectedGraph: null },
  ]);
  const [nextId, setNextId] = useState(2);

  // 이미 선택된 그래프 옵션들을 제외한 나머지 옵션들을 반환
  const getAvailableOptions = (currentId) => {
    const selectedValues = graphSelections
      .filter((selection) => selection.id !== currentId)
      .map((selection) => selection.selectedGraph);

    return GRAPH_OPTIONS.filter(
      (option) => !selectedValues.includes(option.value)
    );
  };

  const handleGraphSelect = (value, id) => {
    setGraphSelections((prev) =>
      prev.map((selection) =>
        selection.id === id ? { ...selection, selectedGraph: value } : selection
      )
    );
  };

  const addGraphSelection = () => {
    if (graphSelections.length < 4) {
      setGraphSelections((prev) => [
        ...prev,
        { id: nextId, selectedGraph: null },
      ]);
      setNextId((prev) => prev + 1);
    }
  };

  const removeGraphSelection = (id) => {
    setGraphSelections((prev) =>
      prev.filter((selection) => selection.id !== id)
    );
  };

  const handleApply = () => {
    const selectedGraphs = graphSelections
      .filter((selection) => selection.selectedGraph)
      .map((selection) => selection.selectedGraph);

    const selectedProcess = pipelines.find((p) => p.id === selectedPipeline);

    console.log("Selected Process:", {
      id: selectedProcess?.id,
      name: selectedProcess?.pipelineName,
    });
    console.log("Selected Graphs:", selectedGraphs);
  };

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

        {graphSelections.map((selection, index) => (
          <S.SelectionGroup key={selection.id}>
            <Select
              style={{ width: 150 }}
              value={selection.selectedGraph}
              onChange={(value) => handleGraphSelect(value, selection.id)}
              placeholder="그래프 선택"
              options={getAvailableOptions(selection.id)}
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
