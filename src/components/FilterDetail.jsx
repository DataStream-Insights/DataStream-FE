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

const FilterItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Badge = styled.span`
  padding: 4px 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #495057;
`;

const FilterValue = styled.div`
  font-size: 1rem;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;

  & > span:first-child {
    font-weight: 500;
    color: #343a40;
  }
`;

const ItemAlias = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #dee2e6;
`;

const FilterDetail = ({ isOpen, onClose, filterId }) => {
  const { detailData, isLoading, error } = useFilterDetail(filterId, isOpen);

  console.log("Render FilterDetail with data:", detailData); // 데이터 확인용 로그

  return (
    <SlideContainer $isOpen={isOpen}>
      <Header>
        <Title>필터 상세 정보</Title>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
      </Header>

      {isLoading && <div>로딩 중...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {detailData && detailData.responseFilterSetListDTO && (
        <div>
          <DetailSection>
            <DetailTitle>필터 조건</DetailTitle>
            {detailData.responseFilterSetListDTO.searchFilterSetDTOs.map(
              (set, index) => (
                <FilterItem key={index}>
                  <FilterItemHeader>
                    {index > 0 && <Badge>{set.andor || "AND"}</Badge>}
                    <Badge>{set.operation.operation}</Badge>
                    <Badge>{set.item_alias}</Badge>
                  </FilterItemHeader>
                  <FilterValue>조건 값: {set.filtervalue.value}</FilterValue>
                </FilterItem>
              )
            )}
          </DetailSection>
        </div>
      )}

      {/* 디버깅용 데이터 표시 */}
      {detailData && (
        <pre
          style={{ fontSize: "12px", padding: "10px", background: "#f8f9fa" }}
        >
          {JSON.stringify(detailData, null, 2)}
        </pre>
      )}
    </SlideContainer>
  );
};

export default FilterDetail;
