import React from "react";
import * as S from "../styles/loadingStyle";
import Spinner from "../assets/loading.gif";

const Loading = () => {
  return (
    <S.Background>
      <S.LoadingText>데이터를 불러오고 있습니다.</S.LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </S.Background>
  );
};

export default Loading;
