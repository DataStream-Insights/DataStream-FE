import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
  background-color: white;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;

  &:hover {
    background-color: #2563eb;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  width: 40%;
  padding: 0.5rem 0.75rem;
  padding-left: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

export const FormatTable = styled.table`
  width: 100%;
`;

export const FormatRow = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const FormatCell = styled.td`
  padding: 0.5rem 1rem;
`;

export const FormatContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
