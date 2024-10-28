import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
  background-color: #f3f4f6;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;
export const CloseButton = styled.button`
  padding: 0.25rem;
  color: #6b7280;
  border-radius: 0.375rem;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.813rem;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.readOnly ? "#f9fafb" : "white")};

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
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

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableText = styled.div`
  font-size: 0.675rem;
  color: #374151;
  padding: 0.25rem;
`;

export const Thead = styled.thead`
  background-color: #f9fafb;
`;

export const Th = styled.th`
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 0.775rem;
  font-weight: 500;
`;

export const Td = styled.td`
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0.2rem;
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.675rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const TableSelect = styled.select`
  width: 100%;
  padding: 0.25rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const IconButton = styled.button`
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: #6b7280;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  background-color: #f3f4f6;
  color: #374151;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  background-color: #3b82f6;
  color: white;

  &:hover {
    background-color: #2563eb;
  }
`;

export const ActionButton = styled.button`
  padding: 0.25rem;
  color: #6b7280;

  &:hover {
    color: #ef4444; // 빨간색으로 변경
  }
`;

export const Section = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const FileInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const FileNameInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  cursor: default;
`;

export const FileButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const FileContent = styled.pre`
  width: 100%;
  height: auto;
  max-height: 120px; // 약 5줄 정도의 높이
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 1rem;
  overflow-y: auto; // 세로 스크롤 추가

  // 스크롤바 스타일링
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

export const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 80px 80px;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const StyleInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const LogStyleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const StyleSelect = styled.select`
  min-width: 120px;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const NumberInput = styled.input`
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;
