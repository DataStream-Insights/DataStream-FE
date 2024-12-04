import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Save, ArrowLeft } from "lucide-react";
import * as S from "../../styles/process/processCreateStyle";
import useProcess from "../../hooks/process/useProcess";
import Loading from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { generatePipelineId } from "../../utils/idGenerator";
import { Switch } from "../../components/ui/switch";
import { useAlert } from "../../context/AlertContext";
import { Form, Input, Select } from "antd";

const ProcessCreate = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { data, loading, error, createPipeline } = useProcess();
  const [pipelineName, setPipelineName] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(undefined);
  const [selectedGraphs, setSelectedGraphs] = useState([]);
  const [isDistinct, setIsDistinct] = useState(false);
  const [formatSelections, setFormatSelections] = useState([
    {
      formatId: undefined,
      filters: [],
    },
  ]);
  const [form] = Form.useForm();

  // 포맷 선택 추가
  const addFormatSelection = () => {
    setFormatSelections([...formatSelections, { formatId: "", filters: [] }]);
  };

  // 포맷 선택 제거
  const removeFormatSelection = (formatIndex) => {
    setFormatSelections(
      formatSelections.filter((_, index) => index !== formatIndex)
    );
  };

  // 필터 추가
  const addFilter = (formatIndex) => {
    const newSelections = [...formatSelections];
    newSelections[formatIndex].filters.push("");
    setFormatSelections(newSelections);
  };

  // 필터 제거
  const removeFilter = (formatIndex, filterIndex) => {
    const newSelections = [...formatSelections];
    newSelections[formatIndex].filters = newSelections[
      formatIndex
    ].filters.filter((_, index) => index !== filterIndex);
    setFormatSelections(newSelections);
  };

  // 포맷 선택 변경
  const handleFormatChange = (formatIndex, value) => {
    const newSelections = [...formatSelections];
    newSelections[formatIndex].formatId = value;
    setFormatSelections(newSelections);
  };

  // 필터 선택 변경
  const handleFilterChange = (formatIndex, filterIndex, value) => {
    const newSelections = [...formatSelections];
    newSelections[formatIndex].filters[filterIndex] = value;
    setFormatSelections(newSelections);
  };

  // 그래프 추가 handler
  const addGraph = (graphId) => {
    setSelectedGraphs((prev) => [...prev, graphId]);
  };

  // 그래프 제거 handler
  const removeGraph = (graphId) => {
    setSelectedGraphs((prev) => prev.filter((id) => id !== graphId));
  };

  const handleSave = async () => {
    // 입력 데이터 유효성 검사
    if (!pipelineName.trim()) {
      showAlert("파이프라인 이름을 입력해주세요.");
      return;
    }
    if (!selectedCampaign) {
      showAlert("캠페인을 선택해주세요.");
      return;
    }
    // 포맷 선택 검사
    const validFormats = formatSelections.filter((format) => format.formatId);
    if (validFormats.length === 0) {
      showAlert("최소 하나의 포맷을 선택해주세요.");
      return;
    }

    // 각 포맷별 필터 선택 검사
    const hasFormatWithoutFilter = formatSelections.some(
      (format) =>
        format.formatId &&
        (!format.filters || format.filters.filter((f) => f).length === 0)
    );

    if (hasFormatWithoutFilter) {
      showAlert("각 포맷에 대해 최소 하나의 필터를 선택해주세요.");
      return;
    }

    // 유효한 포맷과 필터만 필터링하여 데이터 구성
    const processData = {
      dto: {
        pipelineName,
        pipelineId: generatePipelineId(),
        distinctCode: isDistinct ? 3 : 0,
        addcampaignTopic: {
          campaignId: selectedCampaign,
          addFormatTopics: validFormats.map((format) => ({
            formatId: format.formatId,
            addFilterTopics: format.filters
              .filter((filter) => filter)
              .map((filter) => ({ filterId: filter })),
          })),
        },
      },
      iddto: selectedGraphs.map((id) => ({ id: Number(id) })),
    };

    console.log(
      "Sending data to server:",
      JSON.stringify(processData, null, 2)
    );

    try {
      await createPipeline(processData);
      showAlert("파이프라인이 성공적으로 생성되었습니다.");
      navigate("/process");
    } catch (err) {
      console.error("Server response error:", err.response?.data);
      showAlert("파이프라인 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading.campaigns || loading.formats || loading.filters) {
    return <Loading />;
  }

  if (error.campaigns || error.formats || error.filters) {
    return (
      <div>에러 발생: {error.campaigns || error.formats || error.filters}</div>
    );
  }

  return (
    <Layout title="프로세스 생성">
      <S.ProcessContainer>
        <S.BackButtonWrapper>
          <S.BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </S.BackButton>
        </S.BackButtonWrapper>

        <S.StyledForm form={form} layout="vertical">
          <S.HeaderContainer>
            <div>
              <Form.Item label="파이프라인" style={{ width: "700px" }}>
                <Input
                  placeholder="파이프라인 이름을 입력하세요"
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                />
              </Form.Item>
            </div>
            <S.ToggleWrapper>
              <span>중복제거</span>
              <Switch
                checked={isDistinct}
                onCheckedChange={setIsDistinct}
                className="ml-2"
              />
            </S.ToggleWrapper>
          </S.HeaderContainer>

          <Form.Item label="캠페인 선택">
            <Select
              value={selectedCampaign || undefined}
              onChange={setSelectedCampaign}
              placeholder="선택하세요"
            >
              {data.campaigns.map((campaign) => (
                <Select.Option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </Select.Option>
              ))}
            </Select>
            {selectedCampaign && (
              <S.SelectionInfo>
                <S.InfoItem>
                  <strong>캠페인명:</strong>
                  {data.campaigns.find((c) => c.id === selectedCampaign)?.name}
                </S.InfoItem>
              </S.SelectionInfo>
            )}
          </Form.Item>

          <S.FormatsContainer>
            {formatSelections.map((formatSelection, formatIndex) => (
              <S.FormatBox key={formatIndex}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Select
                    value={formatSelection.formatId || undefined}
                    onChange={(value) => handleFormatChange(formatIndex, value)}
                    placeholder="포맷 선택"
                    style={{ flex: 1 }}
                  >
                    {data.formats
                      .filter(
                        (format) =>
                          format.id === formatSelection.formatId ||
                          !formatSelections.some(
                            (selection) => selection.formatId === format.id
                          )
                      )
                      .map((format) => (
                        <Select.Option key={format.id} value={format.id}>
                          {format.name}
                        </Select.Option>
                      ))}
                  </Select>
                  <S.IconButton
                    onClick={() => removeFormatSelection(formatIndex)}
                  >
                    <X size={12} />
                  </S.IconButton>
                </div>

                {formatSelection.formatId && (
                  <S.SelectionInfo>
                    <S.InfoItem>
                      <strong>포맷명:</strong>
                      {
                        data.formats.find(
                          (f) => f.id === formatSelection.formatId
                        )?.name
                      }
                    </S.InfoItem>
                    <S.InfoItem>
                      <strong>ID:</strong>
                      {formatSelection.formatId}
                    </S.InfoItem>
                  </S.SelectionInfo>
                )}

                {/* 필터 섹션 */}
                {formatSelection.filters.map((filter, filterIndex) => (
                  <S.FilterBox key={filterIndex}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Select
                        value={filter || undefined}
                        onChange={(value) =>
                          handleFilterChange(formatIndex, filterIndex, value)
                        }
                        placeholder="필터 선택"
                        style={{ flex: 1 }}
                      >
                        {data.filters
                          .filter(
                            (f) =>
                              f.id === filter ||
                              !formatSelection.filters.some(
                                (selectedFilter) => selectedFilter === f.id
                              )
                          )
                          .map((filter) => (
                            <Select.Option key={filter.id} value={filter.id}>
                              {filter.name}
                            </Select.Option>
                          ))}
                      </Select>
                      <S.IconButton
                        onClick={() => removeFilter(formatIndex, filterIndex)}
                      >
                        <X size={12} />
                      </S.IconButton>
                    </div>
                    {filter && (
                      <S.SelectionInfo>
                        <S.InfoItem>
                          <strong>필터명:</strong>
                          {data.filters.find((f) => f.id === filter)?.name}
                        </S.InfoItem>
                        <S.InfoItem>
                          <strong>ID:</strong>
                          {filter}
                        </S.InfoItem>
                      </S.SelectionInfo>
                    )}
                  </S.FilterBox>
                ))}

                <S.AddIconButton
                  onClick={() => addFilter(formatIndex)}
                  disabled={
                    formatSelection.filters.length >= data.filters.length
                  }
                >
                  필터 추가
                </S.AddIconButton>
              </S.FormatBox>
            ))}

            <S.AddIconButton
              onClick={addFormatSelection}
              disabled={formatSelections.length >= data.formats.length}
            >
              포맷 추가
            </S.AddIconButton>
          </S.FormatsContainer>

          <S.GraphSection>
            <S.SectionTitle>그래프 선택</S.SectionTitle>
            <S.GraphList>
              {data.graphs.map((graph) => (
                <S.GraphItem
                  key={graph.id}
                  selected={selectedGraphs.includes(graph.id)}
                  onClick={() => {
                    if (selectedGraphs.includes(graph.id)) {
                      removeGraph(graph.id);
                    } else {
                      addGraph(graph.id);
                    }
                  }}
                >
                  <S.GraphName>{graph.name}</S.GraphName>
                  <S.GraphDescription>{graph.creator}</S.GraphDescription>
                </S.GraphItem>
              ))}
            </S.GraphList>
          </S.GraphSection>

          <S.ButtonContainer>
            <S.SubmitButton onClick={handleSave}>
              <Save size={16} />
              저장
            </S.SubmitButton>
          </S.ButtonContainer>
        </S.StyledForm>
      </S.ProcessContainer>
    </Layout>
  );
};

export default ProcessCreate;
