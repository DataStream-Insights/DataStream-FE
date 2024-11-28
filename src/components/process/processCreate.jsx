import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Save } from "lucide-react";
import * as S from "../../styles/process/processCreateStyle";
import useProcess from "../../hooks/process/useProcess";
import Loading from "../../components/Loading";
import { Layout } from "../../components/Layout";
import { generatePipelineId } from "../../utils/idGenerator";
import { Switch } from "../../components/ui/switch";
import { useAlert } from "../../context/AlertContext";

const ProcessCreate = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { data, loading, error, createPipeline } = useProcess();
  const [pipelineName, setPipelineName] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [isDistinct, setIsDistinct] = useState(false);
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
        <S.HeaderContainer>
          <div>
            <S.SectionTitle>파이프라인</S.SectionTitle>
            <S.ProcessNameInput
              placeholder="파이프라인 이름을 입력하세요"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
            />
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
                <S.IconButton
                  onClick={() => removeFormatSelection(formatIndex)}
                  aria-label="Delete format"
                >
                  <span
                    style={{
                      display: "block",
                      width: "12px",
                      height: "2px",
                      backgroundColor: "currentColor",
                    }}
                  />
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
                    <S.IconButton
                      onClick={() => removeFilter(formatIndex, filterIndex)}
                      aria-label="Delete filter"
                    >
                      <span
                        style={{
                          display: "block",
                          width: "12px",
                          height: "2px",
                          backgroundColor: "currentColor",
                        }}
                      />
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
                disabled={formatSelection.filters.length >= data.filters.length}
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

        <S.ButtonContainer>
          <S.SubmitButton onClick={handleSave}>
            <Save size={16} />
            저장
          </S.SubmitButton>
        </S.ButtonContainer>
      </S.ProcessContainer>
    </Layout>
  );
};

export default ProcessCreate;
