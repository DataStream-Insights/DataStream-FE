import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Database,
  FileText,
  BarChart2,
  Layout,
  PieChart,
  ClipboardList,
} from "lucide-react";
import * as S from "../styles/sidebarStyle";
import Logo from "../assets/logo.svg";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Campaign",
      icon: <Database size={20} />,
      subItems: [{ name: "캠페인 관리", path: "/campaign" }],
    },
    {
      title: "Format",
      icon: <Layout size={20} />,
      subItems: [{ name: "포맷 관리", path: "/format" }],
    },
    {
      title: "Filter",
      icon: <ClipboardList size={20} />,
      subItems: [{ name: "필터 관리", path: "/filter/filtermanagement" }],
    },
    {
      title: "Process",
      icon: <PieChart size={20} />,
      subItems: [
        { name: "프로세스 관리", path: "/process" },
        { name: "프로세스 생성", path: "/process/create" },
      ],
    },
    {
      title: "대시보드",
      icon: <BarChart2 size={20} />,
      subItems: [{ name: "사용자분석", path: "/analytics" }],
    },
  ];

  return (
    <S.SidebarContainer collapsed={collapsed}>
      <S.SidebarHeader collapsed={collapsed}>
        <S.LogoContainer
          collapsed={collapsed}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo} alt="Logify" />
        </S.LogoContainer>
        <S.CollapseButton onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.3s",
            }}
          />
        </S.CollapseButton>
      </S.SidebarHeader>

      <S.MenuContainer>
        {menuItems.map((item, index) => (
          <S.MenuItem key={index}>
            <S.MenuItemHeader>
              {item.icon}
              {!collapsed && <S.MenuItemText>{item.title}</S.MenuItemText>}
            </S.MenuItemHeader>
            {!collapsed && (
              <S.SubMenuContainer>
                {item.subItems.map((subItem, subIndex) => (
                  <S.SubMenuItem
                    key={subIndex}
                    onClick={() => navigate(subItem.path)}
                  >
                    {subItem.name}
                  </S.SubMenuItem>
                ))}
              </S.SubMenuContainer>
            )}
          </S.MenuItem>
        ))}
      </S.MenuContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
