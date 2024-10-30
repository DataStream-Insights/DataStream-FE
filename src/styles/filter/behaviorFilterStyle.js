import styled from "styled-components";

export const Container = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #868e96;

  &:hover {
    color: #495057;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 2px dashed #dee2e6;
  border-radius: 4px;
  color: #868e96;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  margin-top: 16px;

  &:hover {
    border-color: #adb5bd;
    color: #495057;
  }
`;

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: #adb5bd;
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const OptionGroup = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }
`;

export const OptionTitle = styled.div`
  padding: 4px 12px;
  font-size: 12px;
  color: #868e96;
  font-weight: 500;
`;

export const Option = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

// 옵션 컨테이너 스타일 추가
export const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

// 드롭다운 컨테이너 수정
export const DropdownContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 120px;
`;

// 태그 스타일 수정
export const Tag = styled.span`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  min-width: 120px;

  &.and {
    background: #ffe3e3;
    color: #c92a2a;
    flex: 0;
  }

  &.idOption {
    background: #e7f5ff;
    color: #1971c2;
  }

  &.operatorOption {
    background: #e6fcf5;
    color: #087f5b;
  }

  &.actionOption {
    background: #fff3bf;
    color: #994500;
  }
`;
