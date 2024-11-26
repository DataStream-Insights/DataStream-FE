import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Play, Square } from "lucide-react";
import { Layout } from "../Layout";
import Loading from "../Loading";
import { executePipeline } from "../../api/ProcessApi";
import useProcessDetail from "../../hooks/process/useProcessDetail";
import * as S from "../../styles/process/processDetailStyle";
import { useAlert } from "../../context/AlertContext";

const ProcessDetail = () => {
  const { id } = useParams();
  const { showAlert } = useAlert();
  const { pipelineDetail, loading, error, refetch } = useProcessDetail(id);
  const [executeLoading, setExecuteLoading] = useState(false);

  const handleExecuteClick = async () => {
    try {
      setExecuteLoading(true);
      console.log("Current status before execute:", pipelineDetail.status);
      console.log(
        "Sending execute request with status:",
        !pipelineDetail.status
      );

      // 실행/중지 요청 보내기
      await executePipeline(Number(id), !pipelineDetail.status);

      // 데이터 다시 불러오기 전에 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 상세 정보 다시 불러오기
      const updatedData = await refetch();
      console.log("Updated pipeline data:", updatedData);
    } catch (err) {
      console.error("Execute pipeline error:", err);
      showAlert("실행 상태 변경에 실패했습니다.");
    } finally {
      setExecuteLoading(false);
    }
  };

  // status 값의 변경을 추적하기 위한 useEffect
  useEffect(() => {
    if (pipelineDetail) {
      console.log("Pipeline Detail Status:", pipelineDetail.status);
    }
  }, [pipelineDetail]);

  if (loading) return <Loading />;
  if (error) return <S.ErrorText>{error}</S.ErrorText>;
  if (!pipelineDetail) return null;

  console.log("Pipeline Detail Status:", pipelineDetail.status);

  return (
    <Layout title="프로세스 상세">
      <S.DetailContainer>
        <S.HeaderWrapper>
          <S.HeaderContent>
            <S.Title>{pipelineDetail.pipelineName}</S.Title>
            <S.StatusBadge $status={pipelineDetail.status}>
              {pipelineDetail.status ? "활성" : "비활성"}
            </S.StatusBadge>
            <S.IdText>파이프라인 ID: {pipelineDetail.pipelineId}</S.IdText>
          </S.HeaderContent>
          <S.ExecuteButton
            onClick={handleExecuteClick}
            disabled={executeLoading}
            $isExecuting={pipelineDetail.status}
          >
            {pipelineDetail.status ? (
              <>
                <Square size={20} />
                중지
              </>
            ) : (
              <>
                <Play size={20} />
                실행
              </>
            )}
          </S.ExecuteButton>
        </S.HeaderWrapper>

        <S.HierarchyContainer>
          {/* Campaign Level */}
          <S.Level>
            <S.Node $type="campaign">
              <S.NodeTitle>
                [캠페인] {pipelineDetail.searchCampaignTopic.campaignName}
              </S.NodeTitle>
              <S.NodeContent>
                <S.NodeItem>
                  <strong>ID:</strong>{" "}
                  {pipelineDetail.searchCampaignTopic.campaignId}
                </S.NodeItem>
              </S.NodeContent>
            </S.Node>

            {/* Format Level */}
            <S.Level $indent={20}>
              {pipelineDetail.searchCampaignTopic.searchFormatTopics.map(
                (format, formatIndex) => (
                  <div key={formatIndex}>
                    <S.Node $type="format">
                      <S.NodeTitle>[포맷] {format.formatName}</S.NodeTitle>
                      <S.NodeContent>
                        <S.NodeItem>
                          <strong>ID:</strong> {format.formatId}
                        </S.NodeItem>
                      </S.NodeContent>
                    </S.Node>

                    {/* Filter Level */}
                    <S.Level $indent={20}>
                      {format.searchFilterTopics.map((filter, filterIndex) => (
                        <S.Node key={filterIndex} $type="filter">
                          <S.NodeTitle>[필터] {filter.filterName}</S.NodeTitle>
                          <S.NodeContent>
                            <S.NodeItem>
                              <strong>ID:</strong> {filter.filterId}
                            </S.NodeItem>
                          </S.NodeContent>
                        </S.Node>
                      ))}
                    </S.Level>
                  </div>
                )
              )}
            </S.Level>
          </S.Level>
        </S.HierarchyContainer>
      </S.DetailContainer>
    </Layout>
  );
};

export default ProcessDetail;
