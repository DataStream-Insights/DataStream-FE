import React from "react";
import * as S from "../styles/LayoutStyle";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export function Layout({ children }) {
  return (
    <S.LayoutWrapper>
      <Sidebar />
      <S.MainContentWrapper>
        <Navbar />
        <S.MainContainer>
          <S.PageContainer>{children}</S.PageContainer>
        </S.MainContainer>
      </S.MainContentWrapper>
    </S.LayoutWrapper>
  );
}
