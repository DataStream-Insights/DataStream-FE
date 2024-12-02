import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Square, Trash2, ArrowLeft } from "lucide-react";
import { Layout } from "../Layout";
import Loading from "../Loading";
import { executePipeline, deletePipeline } from "../../api/ProcessApi";
import useProcessDetail from "../../hooks/process/useProcessDetail";
import * as S from "../../styles/process/processDetailStyle";
import { useAlert } from "../../context/AlertContext";
import { useConfirm } from "../../context/ConfirmContext";

const ProcessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { showConfirm } = useConfirm();
  const { pipelineDetail, loading, error, refetch } = useProcessDetail(id);
  const [executeLoading, setExecuteLoading] = useState(false);

  // const handleDelete = async () => {
  //   const isConfirmed = await showConfirm("정말 삭제하시겠습니까?");

  //   if (isConfirmed) {
  //     try {
  //       await deletePipeline(Number(id));
  //       showAlert("파이프라인이 성공적으로 삭제되었습니다.");
  //       navigate("/process");
  //     } catch (error) {
  //       console.error("Delete pipeline error:", error);
  //       showAlert("파이프라인 삭제에 실패했습니다.");
  //     }
  //   }
  // };
  const handleDelete = async () => {
    // 실행 상태에 따라 다른 메시지 표시
    const confirmMessage = pipelineDetail.status
      ? "프로세스 관련 모든 리소스가 삭제됩니다. 정말 삭제하시겠습니까?"
      : "정말 삭제하시겠습니까?";

    const isConfirmed = await showConfirm(confirmMessage);

    if (isConfirmed) {
      try {
        await deletePipeline(Number(id));
        showAlert("파이프라인이 성공적으로 삭제되었습니다.");
        navigate("/process");
      } catch (error) {
        console.error("Delete pipeline error:", error);
        showAlert("파이프라인 삭제에 실패했습니다.");
      }
    }
  };

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
    <Layout>
      <S.DetailContainer>
        <S.BackButtonWrapper>
          <S.BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </S.BackButton>
        </S.BackButtonWrapper>
        <S.HeaderWrapper>
          <S.HeaderContent>
            <S.Title>{pipelineDetail.pipelineName}</S.Title>
            <S.StatusBadge $status={pipelineDetail.status}>
              {pipelineDetail.status ? "활성" : "비활성"}
            </S.StatusBadge>
            <S.IdText>파이프라인 ID: {pipelineDetail.pipelineId}</S.IdText>
          </S.HeaderContent>
          <S.ButtonGroup>
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
            <S.DeleteButton onClick={handleDelete} title="파이프라인 삭제">
              <Trash2 size={20} />
              삭제
            </S.DeleteButton>
          </S.ButtonGroup>
        </S.HeaderWrapper>

        <S.HierarchyContainer>
          <S.NodeWrapper>
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

            {pipelineDetail.searchCampaignTopic.searchFormatTopics.map(
              (format, formatIndex) => (
                <S.NodeWrapper key={formatIndex} $indent={40}>
                  <S.Node $type="format">
                    <S.NodeTitle>[포맷] {format.formatName}</S.NodeTitle>
                    <S.NodeContent>
                      <S.NodeItem>
                        <strong>ID:</strong> {format.formatId}
                      </S.NodeItem>
                    </S.NodeContent>
                  </S.Node>

                  {format.searchFilterTopics.map((filter, filterIndex) => (
                    <S.NodeWrapper key={filterIndex} $indent={40}>
                      <S.Node $type="filter">
                        <S.NodeTitle>[필터] {filter.filterName}</S.NodeTitle>
                        <S.NodeContent>
                          <S.NodeItem>
                            <strong>ID:</strong> {filter.filterId}
                          </S.NodeItem>
                        </S.NodeContent>
                      </S.Node>
                    </S.NodeWrapper>
                  ))}
                </S.NodeWrapper>
              )
            )}
          </S.NodeWrapper>
        </S.HierarchyContainer>
      </S.DetailContainer>
    </Layout>
  );
};

export default ProcessDetail;
