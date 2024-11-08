import React from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import useFilterDetail from "../hooks/filter/useFilterDetail";

const SlideContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.$isOpen ? "0" : "-100%")};
  width: 50%;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
  margin: 0;
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
`;

const DetailTitle = styled.h3`
  font-size: 1.1rem;
  color: #495057;
  margin-bottom: 12px;
`;

const FilterItem = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: ${(props) => {
    switch (props.$type) {
      case "andor":
        return "#e3f2fd"; // 연한 파랑
      case "alias":
        return "#f3e5f5"; // 연한 보라
      case "operation":
        return "#e8f5e9"; // 연한 초록
      case "value":
        return "#fff3e0"; // 연한 주황
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => {
    switch (props.$type) {
      case "andor":
        return "#1976d2"; // 진한 파랑
      case "alias":
        return "#7b1fa2"; // 진한 보라
      case "operation":
        return "#2e7d32"; // 진한 초록
      case "value":
        return "#e65100"; // 진한 주황
      default:
        return "#495057";
    }
  }};
`;

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

const FilterDetail = ({ isOpen, onClose, filterId }) => {
  const { detailData, isLoading, error } = useFilterDetail(filterId, isOpen);

  if (error) {
    return (
      <SlideContainer $isOpen={isOpen}>
        <Header>
          <Title>필터 상세 정보</Title>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>
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
      </SlideContainer>
    );
  }

  return (
    <SlideContainer $isOpen={isOpen}>
      <Header>
        <Title>필터 상세 정보</Title>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
      </Header>

      {isLoading && <div>로딩 중...</div>}

      {detailData && detailData.responseFilterSetListDTO && (
        <div>
          <DetailSection>
            <DetailTitle>필터 조건</DetailTitle>
            {detailData.responseFilterSetListDTO.searchFilterSetDTOs.map(
              (set, index) => (
                <FilterItem key={index}>
                  <BadgeContainer>
                    {index > 0 && (
                      <Badge $type="andor">{set.andor || "AND"}</Badge>
                    )}
                    <Badge $type="alias">{set.item_alias}</Badge>
                    <Badge $type="operation">
                      {getOperationSymbol(set.operation.operation)}
                    </Badge>
                    <Badge $type="value">{set.filtervalue.value}</Badge>
                  </BadgeContainer>
                </FilterItem>
              )
            )}
          </DetailSection>
        </div>
      )}
    </SlideContainer>
  );
};

export default FilterDetail;
