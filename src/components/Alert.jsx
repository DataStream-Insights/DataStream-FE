import React from "react";
import { Activity } from "lucide-react";
import * as S from "../styles/AlertStyle";

const Alert = ({ message, onClose }) => {
  // ESC 키를 누르면 알림창이 닫히도록 설정
  React.useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  // 배경 클릭 시 알림창이 닫히도록 설정
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.AlertBackdrop onClick={handleBackdropClick}>
      <S.AlertContainer>
        <S.IconWrapper>
          <Activity />
        </S.IconWrapper>
        <S.AlertText>{message}</S.AlertText>
        <S.AlertButton onClick={onClose}>OK</S.AlertButton>
      </S.AlertContainer>
    </S.AlertBackdrop>
  );
};

export default Alert;
