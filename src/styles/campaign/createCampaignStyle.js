import styled from "styled-components";
import { Form as AntForm, Select as AntSelect } from "antd";

export const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 5px;
`;

export const StyledForm = styled(AntForm)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-form-item-label {
    padding-bottom: 8px;
  }

  .ant-select {
    min-width: 150px;

    .ant-select-selection-placeholder {
      color: rgba(0, 0, 0, 0.25);
      opacity: 1 !important;
    }
  }

  .ant-input,
  .ant-select,
  .ant-picker {
    &:hover,
    &:focus {
      border-color: #4285f4;
    }
  }

  .ant-radio-group {
    display: flex;
    gap: 32px;
  }
`;

export const StyledSelect = styled(AntSelect)`
  &.ant-select {
    min-width: 150px;
  }

  .ant-select-selection-placeholder {
    color: rgba(0, 0, 0, 0.25) !important;
    opacity: 1 !important;
  }
`;

export const FormCard = styled.div`
  background: white;
  height: 100%;
  padding: 10px 0px 10px 32px;
  overflow-y: auto;
`;

export const CategoryContainer = styled.div`
  display: flex;
  gap: 12px;

  .ant-select {
    flex: 1;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    width: 4px;
    height: 18px;
    background: #4285f4;
    margin-right: 8px;
    border-radius: 2px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 12px;

  .ant-select {
    flex: 1;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const EndAfterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NumberInput = styled.input`
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;

export const CustomerTypeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;

export const BackButton = styled.button`
  padding: 8px 24px;
  background: #ffffff;
  color: #666666;
  border: 1px solid #cccccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #0066cc;
  border-radius: 4px;
  background: white;
  color: #0066cc;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
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

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
`;
