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

  // 최대 높이 설정 및 스크롤 추가
  max-height: 200px; // 원하는 높이로 조정 가능
  overflow-y: auto; // 세로 스크롤 추가

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Option = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

export const DropdownContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 120px;
`;

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

export const CustomInputContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 120px;

  form {
    margin: 0;
  }
`;

export const CustomInput = styled.input`
  width: 100%;
  padding: 6px 12px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4dabf7;
  }
`;

export const LogicalOperatorContainer = styled.div`
  margin: 8px 0;
  padding-left: 32px; // RemoveButton 너비만큼 띄우기
`;

export const LogicalOperatorGroup = styled.div`
  display: inline-flex;
  gap: 8px;
`;

export const OperatorTag = styled.div`
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;

  // 선택된 상태와 기본 상태의 스타일
  background: ${(props) => (props.$isActive ? "#ffe3e3" : "#f8f9fa")};
  color: ${(props) => (props.$isActive ? "#c92a2a" : "#868e96")};
  border: 1px solid ${(props) => (props.$isActive ? "#ffc9c9" : "#dee2e6")};
  font-weight: ${(props) => (props.$isActive ? "500" : "normal")};

  &:hover {
    background: ${(props) => (props.$isActive ? "#ffe3e3" : "#fff0f0")};
    color: #c92a2a;
    border-color: #ffc9c9;
  }
`;
