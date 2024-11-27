import React from "react";
import { Settings, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "../styles/navbarStyle";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "campaign", label: "Campaign", path: "/campaign" },
    { id: "format", label: "Format", path: "/format" },
    { id: "filter", label: "Filter", path: "/filter/filtermanagement" },
    { id: "process", label: "Process", path: "/process" },
    { id: "DataAnalytics", label: "DataAnalytics", path: "/analytics" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <S.NavbarContainer>
      <S.NavLeft>
        {/* <S.NavTitle>DataAnalytics</S.NavTitle> */}
        <S.TabList>
          {tabs.map((tab) => (
            <S.TabItem
              key={tab.id}
              active={isActive(tab.path)}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.label}
            </S.TabItem>
          ))}
        </S.TabList>
      </S.NavLeft>
      <S.NavButtons>
        <S.IconButton>
          <Settings size={20} />
        </S.IconButton>
        <S.IconButton>
          <User size={20} />
        </S.IconButton>
      </S.NavButtons>
    </S.NavbarContainer>
  );
};

export default Navbar;
