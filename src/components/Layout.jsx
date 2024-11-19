import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as S from "../styles/LayoutStyle";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export function Layout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    console.log("Location changed:", location.pathname);
    console.log("Params:", params);
  }, [location.pathname, params]);

  const isActive = (path) => location.pathname === path;

  const renderNavigation = () => {
    const pathSegments = location.pathname.split("/");

    // format/:campaignId/management 패턴 체크
    const isFormatManagement =
      pathSegments[1] === "format" && pathSegments[3] === "management";

    // filter/:campaignId/:formatId/filtermanagement 패턴 체크
    const isFilterManagement =
      pathSegments[1] === "filter" && pathSegments[4] === "filtermanagement";

    if (isFormatManagement || isFilterManagement) {
      const { campaignId } = params;
      return (
        <S.MenuBar>
          <S.MenuItem active={isActive("/")} onClick={() => navigate("/")}>
            캠페인 목록
          </S.MenuItem>
          <S.MenuItem
            active={isActive(`/format/${campaignId}/management`)}
            onClick={() => navigate(`/format/${campaignId}/management`)}
          >
            포맷팅 목록
          </S.MenuItem>
        </S.MenuBar>
      );
    }

    switch (location.pathname) {
      case "/":
        return <S.Description>설명</S.Description>;

      case "/filtermanagement":
        return (
          <S.MenuBar>
            <S.MenuItem active={isActive("/")} onClick={() => navigate("/")}>
              캠페인 목록
            </S.MenuItem>
            <S.MenuItem
              active={isActive("/format")}
              onClick={() => navigate("/format")}
            >
              포맷 관리
            </S.MenuItem>
          </S.MenuBar>
        );

      default:
        return (
          <S.MenuBar>
            <S.MenuItem active={isActive("/")} onClick={() => navigate("/")}>
              캠페인 목록
            </S.MenuItem>
          </S.MenuBar>
        );
    }
  };

  return (
    <S.LayoutWrapper>
      <Sidebar />
      <S.MainContentWrapper>
        <Navbar />
        <S.MainContainer>
          <S.PageContainer>
            <S.Header>
              <S.Title>{title}</S.Title>
              {renderNavigation()}
            </S.Header>
            {children}
          </S.PageContainer>
        </S.MainContainer>
      </S.MainContentWrapper>
    </S.LayoutWrapper>
  );
}
