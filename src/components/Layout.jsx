import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as S from "../styles/LayoutStyle";

export function Layout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams(); // URL 파라미터 가져오기

  useEffect(() => {
    console.log("Location changed:", location.pathname);
    console.log("Params:", params); // 파라미터 로깅
  }, [location.pathname, params]);

  const isActive = (path) => location.pathname === path;

  const renderNavigation = () => {
    // format/:campaignId/management 패턴 체크
    const pathSegments = location.pathname.split("/");
    const isFormatManagement =
      pathSegments[1] === "format" && pathSegments[3] === "management";

    console.log("Path segments:", pathSegments);
    console.log("Is format management:", isFormatManagement);

    if (isFormatManagement) {
      return (
        <S.MenuBar>
          <S.MenuItem active={isActive("/")} onClick={() => navigate("/")}>
            캠페인 목록
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
    <S.PageContainer>
      <S.Header>
        <S.Title>{title}</S.Title>
        {renderNavigation()}
      </S.Header>
      {children}
    </S.PageContainer>
  );
}
