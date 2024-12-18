import React from "react";
import { X } from "lucide-react";
import Loading from "../../components/Loading";
import useFilterDetail from "../../hooks/filter/useFilterDetail";
import * as S from "../../styles/filter/filterdetailStyle";

const FilterDetail = ({ onClose, filterId }) => {
  // isOpen prop 제거
  const { detailData, isLoading, error } = useFilterDetail(filterId, true);

  const getOperationSymbol = (operation) => {
    switch (operation) {
      case "equals":
        return "=";
      case "not_equals":
        return "≠";
      case "greater_than":
        return ">";
      case "less_than":
        return "<";
      case "greater_equals":
        return "≥";
      case "less_equals":
        return "≤";
      default:
        return operation;
    }
  };

  if (error) {
    return (
      <div>
        {" "}
        {/* SlideContainer를 일반 div로 변경 */}
        <S.Header>
          <S.Title>필터 상세 정보</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.Header>
        <div
          style={{
            color: "red",
            padding: "20px",
            backgroundColor: "#fff3f3",
            borderRadius: "4px",
            margin: "20px",
          }}
        >
          {error}
          <div style={{ marginTop: "10px", fontSize: "0.9em" }}>
            필터 ID: {filterId}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {" "}
      {/* SlideContainer를 일반 div로 변경 */}
      <S.Header>
        <S.Title>필터 상세 정보</S.Title>
        <S.CloseButton onClick={onClose}>
          <X size={24} />
        </S.CloseButton>
      </S.Header>
      {isLoading && <Loading />}
      {detailData && detailData.responseFilterSetListDTO && (
        <div style={{ padding: "20px" }}>
          {" "}
          {/* 내용에 패딩 추가 */}
          <S.DetailSection>
            <S.DetailTitle>필터 조건</S.DetailTitle>
            {detailData.responseFilterSetListDTO.searchFilterSetDTOs.map(
              (set, index) => (
                <S.FilterItem key={index}>
                  <S.BadgeContainer>
                    {index > 0 && (
                      <S.Badge $type="andor">{set.andor || "AND"}</S.Badge>
                    )}
                    <S.Badge $type="alias">{set.item_alias}</S.Badge>
                    <S.Badge $type="operation">
                      {getOperationSymbol(set.operation.operation)}
                    </S.Badge>
                    <S.Badge $type="value">{set.filtervalue.value}</S.Badge>
                  </S.BadgeContainer>
                </S.FilterItem>
              )
            )}
          </S.DetailSection>
        </div>
      )}
    </div>
  );
};

export default FilterDetail;
