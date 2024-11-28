import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 1rem;
  height: 100%;
  background-color: white;
`;

export const LeftSection = styled.div`
  flex: 1;
`;

export const RightSection = styled.div`
  flex: 1;
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
    border-color: #6366f1;
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
  color: #6366f1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #1a73e8; // 호버시 진한 파란색
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    white-space: normal;
    overflow: visible;
    position: relative;
    z-index: 1;
  }
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
    color: #6366f1; // Indigo-500
  }
`;

export const PageNumber = styled.button`
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  color: ${(props) => (props.$isActive ? "#6366f1" : "#6B7280")}; // Indigo-500
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.875rem;
  min-width: 28px;
  transition: all 0.2s;
  font-weight: ${(props) => (props.$isActive ? "600" : "normal")};

  &:hover {
    background-color: #f3f4f6;
    color: #6366f1; // Indigo-500
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
      background-color: #6366f1; // Indigo-500
      border-radius: 1px;
    }
  `}
`;

// 필터 섹션 관련 스타일
export const FilterSection = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 20px;
`;

export const FilterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

// Save 버튼 관련 스타일
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 20px;
  background: transparent;
  border: 1.5px solid #10b981; // Green
  color: #10b981;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(16, 185, 129, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// 폼 관련 스타일
export const Section = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.813rem;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.readOnly ? "#f9fafb" : "white")};

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const RepeatSection = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

export const TableContainer = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const THead = styled.thead`
  background: #f8f9fa;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const Th = styled.th`
  padding: 12px;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
`;

export const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
`;

export const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;

  &.and {
    background: #ffe3e3;
    color: #c92a2a;
  }

  &.id {
    background: #e7f5ff;
    color: #1971c2;
  }

  &.equals {
    background: #e6fcf5;
    color: #087f5b;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const NumberInput = styled.input`
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 4px 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 20px;

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196f3;
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  background: #ffffff;
  color: #666666;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;
