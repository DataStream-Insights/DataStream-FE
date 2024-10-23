import styled from "styled-components";

export const HeaderContainer = styled.div`
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateInput = styled.input.attrs({ type: "date" })`
  padding: 8px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
`;

export const StateDropdown = styled.select`
  padding: 8px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  background: #f8f9fa;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #e9ecef;
  }
`;

export const CreateButton = styled.button`
  padding: 8px 16px;
  background: #4263eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #364fc7;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const TableContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #495057;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;
