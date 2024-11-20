import styled from "styled-components";

export const ProcessContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
`;

export const ProcessNameInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const FormatsContainer = styled.div`
  margin-top: 2rem;
`;

export const FormatBox = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
`;

export const FilterBox = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

export const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4263eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem 0;

  &:hover {
    background-color: #374bd8;
  }
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

export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4263eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: #374bd8;
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
