import React from "react";
import { AlertTriangle } from "lucide-react";
import * as S from "../styles/ConfirmStyle";

const Confirm = ({ message, onConfirm, onCancel }) => {
  // ESC 키를 누르면 취소되도록 설정
  React.useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [onCancel]);

  // 배경 클릭 시 취소되도록 설정
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <S.ConfirmBackdrop onClick={handleBackdropClick}>
      <S.ConfirmContainer>
        <S.IconWrapper>
          <AlertTriangle />
        </S.IconWrapper>
        <S.Message>{message}</S.Message>
        <S.ButtonContainer>
          <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
        </S.ButtonContainer>
      </S.ConfirmContainer>
    </S.ConfirmBackdrop>
  );
};

export default Confirm;
