import styled from "styled-components";

export const AlertBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // 최상위에 표시되도록 높은 z-index 설정
`;

export const AlertContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
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
  background-color: #333;
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

export const AlertText = styled.p`
  color: #333;
  font-size: 14px;
  text-align: center;
  margin: 0;
  word-break: keep-all;
  line-height: 1.5;
`;

export const AlertButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 0;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3574e2;
  }
`;
