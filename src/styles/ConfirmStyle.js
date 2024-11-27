import styled from "styled-components";

export const ConfirmBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ConfirmContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: #ff9800;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const Message = styled.p`
  color: #333;
  font-size: 14px;
  text-align: center;
  margin: 0;
  word-break: keep-all;
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

export const Button = styled.button`
  flex: 1;
  padding: 8px 0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: #dc2626;
  color: white;
`;

export const CancelButton = styled(Button)`
  background-color: #e5e7eb;
  color: #374151;
`;
