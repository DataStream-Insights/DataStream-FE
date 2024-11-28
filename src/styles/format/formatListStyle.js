import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
  background-color: white;
`;

export const Header = styled.div`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const SubTitle = styled.h3`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .id-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .description {
    color: #6b7280;
    font-size: 0.775rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // hover 시 전체 텍스트 표시
  &:hover {
    white-space: normal;
    overflow: visible;
    position: relative;
    z-index: 1;

    .description {
      white-space: normal;
      overflow: visible;
    }
  }
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
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
/**
 * 페이지네이션 컨테이너
 * - 페이지 번호와 이전/다음 버튼을 중앙 정렬로 배치
 * - 요소들 사이에 일정한 간격 유지
 */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
`;

/**
 * 이전/다음 페이지 버튼
 * - 테두리와 호버 효과 포함
 * - 비활성화 상태일 때 시각적 피드백 제공
 */
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

/**
 * 페이지 번호 버튼
 * - $isActive prop에 따라 활성/비활성 상태 스타일 변경
 * - 호버 효과 포함
 */
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
