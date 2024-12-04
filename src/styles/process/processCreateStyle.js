import styled from "styled-components";
import { Form as AntForm, Select as AntSelect, Input as AntInput } from "antd";

export const StyledForm = styled(AntForm)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-form-item-label {
    padding-bottom: 8px;
  }

  .ant-input,
  .ant-select {
    &:hover,
    &:focus {
      border-color: #4285f4;
    }
  }
`;

// Input 컴포넌트 스타일링
export const StyledInput = styled(AntInput)`
  width: 100%;
`;

// 포맷 박스 스타일링
export const FormatBox = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
`;

export const ProcessContainer = styled.div`
  padding: 0.3rem;
  background-color: white;
  border-radius: 8px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;

  > div:first-child {
    flex: 1;
  }
`;

export const ProcessNameInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: transparent;
  color: #666;
  border: 2px solid #666;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 0.7rem;
  margin-left: 0.8rem;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding-top: 2rem;

  span {
    font-size: 0.9rem;
    color: #666;
  }
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
`;

export const StyledSelect = styled(AntSelect)`
  &.ant-select {
    width: 100%;
  }

  .ant-select-selection-placeholder {
    color: rgba(0, 0, 0, 0.25); // placeholder 색상
    opacity: 1;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const FormatsContainer = styled.div`
  margin-top: 2rem;
`;

export const FilterBox = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

export const RemoveButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background-color: #c82333;
  }
`;

export const PreviewSection = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  color: #666;

  &:hover {
    color: #333;
  }

  svg {
    stroke-width: 2.5;
  }
`;

export const SubmitButton = styled.button`
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

export const SelectionInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const InfoItem = styled.span`
  color: #666;

  strong {
    color: #333;
    margin-right: 0.5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const AddIconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: transparent;
  color: #666;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #4263eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::before {
    content: "+";
    display: inline-block;
    font-size: 1.2rem;
    line-height: 1;
    font-weight: bold;
  }
`;

export const GraphSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e1e1;
`;

export const GraphList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const GraphItem = styled.div`
  padding: 1rem;
  border: 1px solid ${(props) => (props.selected ? "#4263eb" : "#e1e1e1")};
  border-radius: 8px;
  background-color: ${(props) =>
    props.selected ? "rgba(66, 99, 235, 0.1)" : "#fff"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4263eb;
    background-color: rgba(66, 99, 235, 0.05);
  }
`;

export const GraphName = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

export const GraphDescription = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #666;
`;
