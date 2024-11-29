import React, { useState } from "react";
import * as S from "../styles/LayoutStyle";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <S.LayoutWrapper>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <S.MainContentWrapper collapsed={collapsed}>
        <Navbar />
        <S.MainContainer>
          <S.PageContainer>{children}</S.PageContainer>
        </S.MainContainer>
      </S.MainContentWrapper>
    </S.LayoutWrapper>
  );
}
