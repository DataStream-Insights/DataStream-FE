import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 5px;
`;

export const FormCard = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0;
  display: flex;
  align-items: center;
  &:before {
    content: "■";
    margin-right: 8px;
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
  gap: 10px;

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 150px;
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
  padding: 8px 24px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  float: right;
  cursor: pointer;

  &:hover {
    background: #0052a3;
  }
`;
