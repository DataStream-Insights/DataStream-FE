import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh; /* Ensure the form takes the full viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
`;
