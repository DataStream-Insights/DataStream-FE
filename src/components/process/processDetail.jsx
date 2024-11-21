import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Square } from "lucide-react";
import { Layout } from "../Layout";
import Loading from "../Loading";
import { executePipeline } from "../../api/ProcessApi";
import useProcessDetail from "../../hooks/process/useProcessDetail";
import * as S from "../../styles/process/processDetailStyle";

const ProcessDetail = () => {
  const { id } = useParams();
  const { pipelineDetail, loading, error } = useProcessDetail(id);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executeLoading, setExecuteLoading] = useState(false);

  const handleExecuteClick = async () => {
    // 요청 데이터 로깅
    const requestData = {
      id: Number(id),
      executable: !isExecuting,
    };
    console.log("Sending request data:", requestData);

    try {
      setExecuteLoading(true);
      const response = await executePipeline(Number(id), !isExecuting);
      console.log("Server response:", response); // 서버 응답 로깅
      setIsExecuting(!isExecuting);
    } catch (err) {
      console.error("Execute pipeline error:", err);
      console.error("Error details:", err.response?.data); // 에러 상세 정보 로깅
      alert("실행 상태 변경에 실패했습니다.");
    } finally {
      setExecuteLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <S.ErrorText>{error}</S.ErrorText>;
  if (!pipelineDetail) return null;

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
            $isExecuting={isExecuting}
          >
            {isExecuting ? (
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
