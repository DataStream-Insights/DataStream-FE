import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
  background-color: white;
`;

export const Header = styled.div`
  margin-bottom: 1.5rem;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 300px; // 검색창 너비 제한
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem; // 오른쪽 패딩을 늘려서 아이콘 공간 확보
  border: 1px solid #e5e7eb;
  border-radius: 20px; // 둥글게 변경
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  background: none;
  border: none;
  color: #4285f4; // Google 블루 컬러로 변경
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #1a73e8; // 호버시 진한 파란색
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #4285f4;
  border: 1px solid #4285f4;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: #4285f4;
    color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; // 테이블 레이아웃 고정
`;

export const TableHeader = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 700;
    color: #374151;
    font-size: 0.875rem;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:nth-child(2) {
      max-width: 300px;
    }
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  max-width: 200px; // 최대 너비 설정
  white-space: nowrap; // 텍스트 줄바꿈 방지
  overflow: hidden; // 넘치는 텍스트 숨김
  text-overflow: ellipsis; // 말줄임(...) 표시

  // ID 셀의 경우 더 넓게 설정 (선택적)
  &:nth-child(2) {
    max-width: 300px;
  }

  // hover 시 툴팁처럼 전체 텍스트 표시 (선택적)
  &:hover {
    white-space: normal;
    overflow: visible;
    position: relative;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $status }) => {
    switch ($status) {
      case "ACTIVE":
        return "#dcfce7";
      case "INACTIVE":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "ACTIVE":
        return "#166534";
      case "INACTIVE":
        return "#991b1b";
      default:
        return "#374151";
    }
  }};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 4px;
`;

export const PaginationButton = styled.button`
  padding: 6px;
  border: none;
  background-color: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    color: #d1d5db;
  }

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    color: #4285f4;
  }
`;

export const PageNumber = styled.button`
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.$isActive ? "#4285F4" : "#6B7280")};
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.875rem;
  min-width: 28px;
  transition: all 0.2s;
  font-weight: ${(props) => (props.$isActive ? "600" : "normal")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#F3F4F6" : "#F3F4F6")};
    color: ${(props) => (props.$isActive ? "#4285F4" : "#4285F4")};
  }

  ${(props) =>
    props.$isActive &&
    `
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 2px;
      background-color: #4285F4;
      border-radius: 1px;
    }
  `}
`;
