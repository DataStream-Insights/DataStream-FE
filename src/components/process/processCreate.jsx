import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/process/processCreateStyle";
import useProcess from "../../hooks/process/useProcess";
import Loading from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { generatePipelineId } from "../../utils/idGenerator";

const ProcessCreate = () => {
  const navigate = useNavigate();
  const { data, loading, error, createPipeline } = useProcess();
  const [pipelineName, setPipelineName] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [formatSelections, setFormatSelections] = useState([
    {
      formatId: "",
      filters: [],
    },
  ]);

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

  const handleSave = async () => {
    // 입력 데이터 유효성 검사
    if (!pipelineName.trim()) {
      alert("파이프라인 이름을 입력해주세요.");
      return;
    }
    if (!selectedCampaign) {
      alert("캠페인을 선택해주세요.");
      return;
    }
    if (!formatSelections.some((format) => format.formatId)) {
      alert("최소 하나의 포맷을 선택해주세요.");
      return;
    }

    // 유효한 포맷과 필터만 필터링
    const validFormats = formatSelections
      .filter((format) => format.formatId)
      .map((format) => ({
        formatId: format.formatId,
        addFilterTopics: format.filters
          .filter((filter) => filter)
          .map((filter) => ({ filterId: filter })),
      }));

    const processData = {
      pipelineName,
      pipelineId: generatePipelineId(),
      addcampaignTopic: {
        campaignId: selectedCampaign,
        addFormatTopics: validFormats,
      },
    };

    console.log(
      "Sending data to server:",
      JSON.stringify(processData, null, 2)
    );

    try {
      await createPipeline(processData);
      alert("파이프라인이 성공적으로 생성되었습니다.");
      navigate("/process"); // 목록 페이지로 이동
    } catch (err) {
      console.error("Server response error:", err.response?.data);
      alert("파이프라인 생성에 실패했습니다. 다시 시도해주세요.");
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
        <S.ProcessNameInput
          placeholder="파이프라인 이름을 입력하세요"
          value={pipelineName}
          onChange={(e) => setPipelineName(e.target.value)}
        />

        <S.Section>
          <S.SectionTitle>캠페인 선택</S.SectionTitle>
          <S.Select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            <option value="">선택하세요</option>
            {data.campaigns.length > 0 ? (
              data.campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                사용 가능한 캠페인이 없습니다
              </option>
            )}
          </S.Select>
          {selectedCampaign && (
            <S.SelectionInfo>
              <S.InfoItem>
                <strong>캠페인명:</strong>
                {data.campaigns.find((c) => c.id === selectedCampaign)?.name}
              </S.InfoItem>
              <S.InfoItem>
                <strong>기안자:</strong>
                {data.campaigns.find((c) => c.id === selectedCampaign)?.creator}
              </S.InfoItem>
            </S.SelectionInfo>
          )}
        </S.Section>
        <S.FormatsContainer>
          {formatSelections.map((formatSelection, formatIndex) => (
            <S.FormatBox key={formatIndex}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <S.Select
                  value={formatSelection.formatId}
                  onChange={(e) =>
                    handleFormatChange(formatIndex, e.target.value)
                  }
                >
                  <option value="">포맷 선택</option>
                  {data.formats
                    .filter(
                      (format) =>
                        // 현재 선택된 포맷이거나, 다른 위치에서 선택되지 않은 포맷만 보여줌
                        format.id === formatSelection.formatId ||
                        !formatSelections.some(
                          (selection) => selection.formatId === format.id
                        )
                    )
                    .map((format) => (
                      <option key={format.id} value={format.id}>
                        {format.name}
                      </option>
                    ))}
                </S.Select>
                <S.RemoveButton
                  onClick={() => removeFormatSelection(formatIndex)}
                >
                  삭제
                </S.RemoveButton>
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

              {formatSelection.filters.map((filter, filterIndex) => (
                <S.FilterBox key={filterIndex}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <S.Select
                      value={filter}
                      onChange={(e) =>
                        handleFilterChange(
                          formatIndex,
                          filterIndex,
                          e.target.value
                        )
                      }
                    >
                      <option value="">필터 선택</option>
                      {data.filters
                        .filter(
                          (f) =>
                            // 현재 선택된 필터이거나, 같은 포맷 내에서 선택되지 않은 필터만 보여줌
                            f.id === filter ||
                            !formatSelection.filters.some(
                              (selectedFilter) => selectedFilter === f.id
                            )
                        )
                        .map((filter) => (
                          <option key={filter.id} value={filter.id}>
                            {filter.name}
                          </option>
                        ))}
                    </S.Select>
                    <S.RemoveButton
                      onClick={() => removeFilter(formatIndex, filterIndex)}
                    >
                      삭제
                    </S.RemoveButton>
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

              <S.AddButton
                onClick={() => addFilter(formatIndex)}
                disabled={formatSelection.filters.length >= data.filters.length}
              >
                필터 추가
              </S.AddButton>
            </S.FormatBox>
          ))}

          <S.AddButton
            onClick={addFormatSelection}
            disabled={formatSelections.length >= data.formats.length}
          >
            포맷 추가
          </S.AddButton>
        </S.FormatsContainer>

        <S.SubmitButton onClick={handleSave}>저장</S.SubmitButton>
      </S.ProcessContainer>
    </Layout>
  );
};

export default ProcessCreate;
