import React, { useState } from "react";

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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Campaign",
      icon: <Database size={20} />,
      subItems: ["캠페인 관리"],
    },
    {
      title: "Format",
      icon: <Layout size={20} />,
      subItems: ["포맷 관리"],
    },
    {
      title: "Filter",
      icon: <ClipboardList size={20} />,
      subItems: ["필터 관리"],
    },
    {
      title: "Process",
      icon: <PieChart size={20} />,
      subItems: ["프로세스 관리", "프로세스 생성"],
    },
    {
      title: "어트리뷰션",
      icon: <BarChart2 size={20} />,
      subItems: ["사용자분석", "이용자분석"],
    },
    {
      title: "원본분석",
      icon: <FileText size={20} />,
      subItems: [
        "방문분석",
        "페이지분석",
        "유입분석",
        "컨텐츠분석",
        "매출분석",
      ],
    },
  ];

  return (
    <S.SidebarContainer collapsed={collapsed}>
      <S.SidebarHeader>
        <S.LogoText collapsed={collapsed}>Logify</S.LogoText>
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
                  <S.SubMenuItem key={subIndex}>{subItem}</S.SubMenuItem>
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
