import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as S from "../styles/LayoutStyle";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export function Layout({ title, children }) {
  return (
    <S.LayoutWrapper>
      <Sidebar />
      <S.MainContentWrapper>
        <Navbar />
        <S.MainContainer>
          <S.PageContainer>
            <S.Header>
              <S.Title>{title}</S.Title>
            </S.Header>
            {children}
          </S.PageContainer>
        </S.MainContainer>
      </S.MainContentWrapper>
    </S.LayoutWrapper>
  );
}
