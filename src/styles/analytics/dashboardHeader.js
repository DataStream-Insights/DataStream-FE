import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SelectContainer = styled.div`
  min-width: 200px;
`;

export const SelectionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #40a9ff;
    border-color: #40a9ff;
  }
`;

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;

  &:hover {
    color: #ff4d4f;
  }
`;

export const ApplyButton = styled.button`
  padding: 4px 15px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #40a9ff;
  }
`;
