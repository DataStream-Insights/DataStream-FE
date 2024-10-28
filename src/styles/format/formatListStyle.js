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
`;

export const TableHeader = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 700;
    color: #374151;
    font-size: 0.875rem;
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

  .id-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .description {
    color: #6b7280;
    font-size: 0.775rem;
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
