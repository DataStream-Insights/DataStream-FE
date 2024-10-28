import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 20px;
`;

export const LeftSection = styled.div`
  flex: 1;
`;

export const RightSection = styled.div`
  flex: 1;
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

export const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  width: 200px;
  &:focus {
    outline: none;
    border-color: #4dabf7;
  }
`;

export const FilterSection = styled.div`
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 20px;
`;

export const FilterTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #212529;
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

export const RepeatSection = styled.div`
  margin-top: 24px;
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
    transition: .4s;
    border-radius: 20px;
    
    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #2196F3;
  }
  
  input:checked + span:before {
    transform: translateX(20px);
  }
`;

export const SaveButton = styled.button`
  padding: 8px 16px;
  background: #228be6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  
  &:hover {
    background: #1c7ed6;
  }
`;