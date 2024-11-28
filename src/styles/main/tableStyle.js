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
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:hover {
    background-color: #2563eb;
  }

  svg {
    width: 16px;
    height: 16px;
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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
`;

export const PaginationButton = styled.button`
  padding: 8px;
  border: 1px solid #e9ecef;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }
`;

export const PageNumber = styled.button`
  padding: 8px 12px;
  border: 1px solid #e9ecef;
  background-color: ${(props) => (props.$isActive ? "#4263eb" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "#495057")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#4263eb" : "#f8f9fa")};
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #495057;
`;

export const TableContainer = styled.div`
  background: white;
  height: calc(100% - 80px); // 헤더 높이 제외
  overflow: auto;
`;

export const HeaderContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #e9ecef;
`;
export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const StateDropdown = styled.select`
  padding: 8px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const THead = styled.thead`
  background: #f8f9fa;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
  font-size: 14px;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
  font-size: 14px;
`;

export const CheckboxCell = styled(Td)`
  width: 40px;
  text-align: center;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

export const SlideContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 70%;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #495057;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #212529;
  }
`;
